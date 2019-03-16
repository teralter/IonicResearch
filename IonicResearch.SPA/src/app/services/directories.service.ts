import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Platform, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { File } from '@ionic-native/File/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Zip } from '@ionic-native/zip/ngx';
import { BehaviorSubject } from 'rxjs';
import { ProgressState } from '../models/progress-state';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
import { getRepository, Repository } from 'typeorm';
import { OutletType } from '../entities/outlet-type';

const DIR_LOADS_KEY = 'directories-loads';

@Injectable({
  providedIn: 'root'
})
export class DirectoriesService {
  baseUrl = environment.apiUrl + 'directories/';
  database: SQLiteObject;
  progressState = new BehaviorSubject<ProgressState>(null);

  constructor(
    private platform: Platform,
    private http: HttpClient,
    private sqlite: SQLite,
    private storage: Storage,
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

  async importDirectory(route: string, dirName: string, isFile: boolean) {
    try {
      if (isFile) {
        const tempDir = (new Date()).getTime().toString();
        const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.onProgress((progressEvent) => {
          this.progressState.next(new ProgressState('Загрузка' + (dirName == null ? '' : ` (${dirName})`), progressEvent.loaded / progressEvent.total));
        });
        const entry = await fileTransfer.download(this.baseUrl + route, this.file.cacheDirectory + tempDir + '/data.zip');
        const result = await this.zip.unzip(entry.toURL(), this.file.cacheDirectory + '/' + tempDir, (progress) => {
          this.progressState.next(new ProgressState('Распаковка' + (dirName == null ? '' : ` (${dirName})`), progress.loaded / progress.total));
        });
        if (result === 0) {
          let files = await this.file.listDir(this.file.cacheDirectory, tempDir);
          files = files.filter(x => x.name.endsWith('.json'));
          for (let i = 0; i < files.length; i++) {
            await this.processFile(files[i], tempDir, i, files.length, dirName);
          }
          await this.file.removeRecursively(this.file.cacheDirectory, tempDir);

          this.saveDirLoads(route);
        }
      } else {
        const types = await this.http.get<OutletType[]>(this.baseUrl + route).toPromise();

        const typeRepository = getRepository('OutletType') as Repository<OutletType>;
        for (const t of types) {
          await typeRepository.save(t);
          this.progressState.next(new ProgressState('Импорт' + (dirName == null ? '' : ` (${dirName})`), (types.indexOf(t) + 1) / (types.length)));

          this.saveDirLoads(route);
        }
      }
    } catch (e) {
      this.showError('Ошибка при импорте');
    }
  }

  async saveDirLoads(route: string) {
    const dirLoads = await this.storage.get(DIR_LOADS_KEY);
    const newDirLoad = { route: route, load: new Date().getTime() };
    if (!dirLoads) {
      await this.storage.set(DIR_LOADS_KEY, [newDirLoad]);
    } else {
      const dirLoad = _.find(dirLoads, { route: route });
      if (!dirLoad) {
        dirLoads.push(newDirLoad);
      } else {
        dirLoad.load = newDirLoad.load;
      }
      await this.storage.set(DIR_LOADS_KEY, dirLoads);
    }
  }

  async processFile(file, tempDir, index, length, dirName?: string) {
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
            this.progressState.next(new ProgressState('Импорт' + (dirName == null ? '' : ` (${dirName})`), (index + current / total) / length));
          },
          batchInsertSize: 500
        });
      });
    });
  }

  getDirLoads() {
    return this.storage.get(DIR_LOADS_KEY);
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
