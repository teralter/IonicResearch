import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Platform, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Zip } from '@ionic-native/zip/ngx';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectoriesService {
  baseUrl = environment.apiUrl + 'directories/';
  database: SQLiteObject;

  constructor(
    private platform: Platform,
    private http: HttpClient,
    private sqlite: SQLite,
    private sqlitePorter: SQLitePorter,
    private file: File,
    private transfer: FileTransfer,
    private zip: Zip,
    private toastCtrl: ToastController
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'IonicResearch3.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
      });
    });
  }

  async import(dictName: string, onProgressChanged: (step: string, progress: number) => void) {
    try {
      const tempDir = (new Date()).getTime().toString();
      const fileTransfer: FileTransferObject = this.transfer.create();
      fileTransfer.onProgress((progressEvent) => {
        onProgressChanged('Загрузка', progressEvent.loaded / progressEvent.total);
      });
      const entry = await fileTransfer.download(this.baseUrl + dictName, this.file.cacheDirectory + tempDir + '/data.zip');
      const result = await this.zip.unzip(entry.toURL(), this.file.cacheDirectory + '/' + tempDir, (progress) => {
        onProgressChanged('Распаковка', progress.loaded / progress.total);
      });
      if (result === 0) {
        const files = await this.file.listDir(this.file.cacheDirectory, tempDir);
        for (const file of files.filter(x => x.name.endsWith('.json'))) {
          await this.processFile(file, tempDir, onProgressChanged);
        }
        await this.file.removeRecursively(this.file.cacheDirectory, tempDir);
      }
    } catch (e) {
      this.showError('Ошибка при импорте');
    }
  }

  async processFile(file, tempDir, onProgressChanged: (step: string, progress: number) => void) {
    return new Promise((resolve, reject) => {
      this.file.readAsText(this.file.cacheDirectory + '/' + tempDir, file.name).then(json => {
        (<any>window).cordova.plugins.sqlitePorter.importJsonToDb(this.database, json, {
          successFn: () => {
            resolve();
          },
          errorFn: (error) => {
            reject(error);
          },
          progressFn: (current, total) => {
            onProgressChanged('Импорт', current / total);
            console.log('Imported ' + current + '/' + total + ' statements');
          },
          batchInsertSize: 500
        });
      });
    });
  }

  async showError(text) {
    const toast = await this.toastCtrl.create({
      color: 'danger',
      message: text,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

}
