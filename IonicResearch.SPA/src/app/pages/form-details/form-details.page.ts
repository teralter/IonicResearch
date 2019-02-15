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

import { OutletForm } from 'src/app/models/outlet-form';
import { OutletType } from 'src/app/models/outlet-type';
import { Platform, ToastController } from '@ionic/angular';
import { OutletPhoto } from 'src/app/models/outlet-photo';
import { OutletProduct } from 'src/app/models/outlet-product';
import { DatabaseProvider } from 'src/app/providers/database/database';

const OUTLETS_KEY = 'outlets';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.page.html',
  styleUrls: ['./form-details.page.scss'],
})
export class FormDetailsPage implements OnInit {
  title: string;
  segement: string;
  outlet: OutletForm;
  outletForm: FormGroup;
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
    private databaseprovider: DatabaseProvider
  ) { }

  ngOnInit() {
    this.outlet = this.route.snapshot.data['outlet'];
    this.title = this.outlet.id !== 0 ? 'Новая анкета' : 'Редактирование анкеты';
    this.segement = 'photos';
    this.monthNames = _.map(moment.localeData('ru').months(), x => x.charAt(0).toUpperCase() + x.slice(1));
    this.ouletTypes = [
      { id: 1, name: 'Гипермаркет' },
      { id: 2, name: 'Киоск' },
      { id: 3, name: 'Хорека' },
      { id: 4, name: 'Пивнушка' },
      { id: 5, name: 'Рынок' }
    ];

    this.outletForm = this.formBuilder.group({
      repDate: [moment.utc().startOf('day').toDate().toJSON(), [Validators.required]],
      name: ['', [Validators.required]],
      inn: ['', [Validators.required, Validators.pattern('^([0-9]{10}|[0-9]{12})$')]],
      address: ['', [Validators.required]],
      typeId: [null, [Validators.required]],
      openingTime: [null, [Validators.required]],
      coords: [null],
    });
    this.photos = [];
  }

  onGetCoords() {
    this.geolocation.getCurrentPosition().then((pos) => {
      this.outletForm.patchValue({ coords: [pos.coords.latitude, pos.coords.longitude] });
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
    this.databaseprovider.addPhoto(new OutletPhoto(1, name)).then(photo => {
      const filePath = this.file.dataDirectory + name;
      const resPath = this.pathForImage(filePath);

      const newEntry = {
        id: 0,
        formId: 1,
        name: name,
        path: resPath,
        filePath: filePath
      };

      this.photos = [newEntry, ...this.photos];
      this.ref.detectChanges(); // trigger change detection cycle
    });
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      const converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }


  onSubmit() {

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
