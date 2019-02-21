import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import * as _ from 'lodash';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File, FileEntry } from '@ionic-native/File/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

import { OutletForm } from 'src/app/entities/outlet-form';
import { OutletType } from 'src/app/entities/outlet-type';
import { Platform, ToastController } from '@ionic/angular';
import { OutletPhoto } from 'src/app/entities/outlet-photo';
import { OutletProduct } from 'src/app/entities/outlet-product';
import { DbService } from 'src/app/services/db.service';
import { getRepository, Repository, createConnection } from 'typeorm';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.page.html',
  styleUrls: ['./form-details.page.scss'],
})
export class FormDetailsPage implements OnInit {
  title: string;
  segement: string;
  outletForm: OutletForm;
  form: FormGroup;
  photos: OutletPhoto[];
  products: OutletProduct[];
  monthNames: string[];
  ouletTypes: OutletType[];
  coords: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private geolocation: Geolocation,
    private camera: Camera,
    private file: File,
    private filePath: FilePath,
    private webview: WebView,
    private plt: Platform,
    private ref: ChangeDetectorRef,
    private toastCtrl: ToastController,
    private dbService: DbService
  ) {
  }

  ngOnInit() {
    this.outletForm = this.route.snapshot.data['outletForm'];
    this.ouletTypes = this.route.snapshot.data['outletTypes'];
    this.title = this.outletForm.id == null ? 'Новая анкета' : 'Редактирование анкеты';
    this.segement = 'form';
    this.monthNames = _.map(moment.localeData('ru').months(), x => x.charAt(0).toUpperCase() + x.slice(1));

    this.initForm();
  }

  initForm() {
    let repDate = moment.utc().startOf('day').format();
    let name = '';
    let inn = '';
    let address = '';
    let type = null;
    let openingTime = null;
    let coords = null;

    if (this.outletForm.id != null) {
      repDate = moment.utc(this.outletForm.repDate).format();
      name = this.outletForm.name;
      inn = this.outletForm.inn;
      address = this.outletForm.address;
      type = this.ouletTypes.find(ot => ot.id === this.outletForm.type.id);
      const hours = Math.floor(this.outletForm.openingTime / 60);
      const minutes = this.outletForm.openingTime % 60;
      openingTime = `${hours >= 10 ? hours : '0' + hours}:${minutes}`;
    }

    this.form = this.formBuilder.group({
      repDate: [repDate, [Validators.required]],
      name: [name, [Validators.required]],
      inn: [inn, [Validators.required, Validators.pattern('^([0-9]{10}|[0-9]{12})$')]],
      address: [address, [Validators.required]],
      type: [type, [Validators.required]],
      openingTime: [openingTime, [Validators.required]],
      coords: [coords],
    });

    this.photos = [];

  }

  onGetCoords() {
    this.geolocation.getCurrentPosition().then((pos) => {
      this.form.patchValue({ coords: [pos.coords.latitude, pos.coords.longitude] });
      this.coords = `${pos.coords.latitude.toFixed(6)};${pos.coords.longitude.toFixed(6)}`;
    }).catch((error) => {
      // todo alert
    });
  }


  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      const correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      const currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    });

  }

  copyFileToLocalDir(correctPath, currentName, newFileName) {
    this.file.copyFile(correctPath, currentName, this.file.dataDirectory, newFileName).then(() => {
      this.updateStoredImages(newFileName);
    }, error => {
      this.presentToast('Ошибка при сохранении фото');
    });
  }

  createFileName() {
    const d = new Date(),
      n = d.getTime(),
      newFileName = n + '.jpg';
    return newFileName;
  }

  updateStoredImages(name) {
    // this.databaseprovider.addPhoto(new OutletPhoto(1, name)).then(photo => {
    //   const filePath = this.file.dataDirectory + name;
    //   const resPath = this.pathForImage(filePath);

    //   const newEntry = {
    //     id: 0,
    //     formId: 1,
    //     name: name,
    //     path: resPath,
    //     filePath: filePath
    //   };

    //   this.photos = [newEntry, ...this.photos];
    //   this.ref.detectChanges(); // trigger change detection cycle
    // });
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      const converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }


  async onSubmitForm() {
    Object.keys(this.form.controls).forEach(c => {
      const control = this.form.controls[c];
      if (!control.valid) {
        control.setValue('');
        control.markAsTouched();
      }
    });

    if (this.form.valid) {
      const value = this.form.value;
      this.outletForm.repDate = new Date(value.repDate);
      this.outletForm.name = value.name;
      this.outletForm.inn = value.inn;
      this.outletForm.address = value.address;
      this.outletForm.type = value.type;

      const text = value.openingTime;
      const tmp = String(text).match(/^(\d+):(\d+)$/);
      const hours = parseInt(tmp[1], 10);
      const minutes = parseInt(tmp[2], 10);

      this.outletForm.openingTime = 60 * hours + minutes;
      if (value.coords) {
        this.outletForm.latitude = value.coords[0];
        this.outletForm.longitude = value.coords[1];
      }
      // this.outletForm.photos = [];
      // this.outletForm.products = [];

      const outletRepository = getRepository('OutletForm') as Repository<OutletForm>;
      await outletRepository.save(this.outletForm);
    }
  }


  async presentToast(text) {
    const toast = await this.toastCtrl.create({
      message: text,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

}
