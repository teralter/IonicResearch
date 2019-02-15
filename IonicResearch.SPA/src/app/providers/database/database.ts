import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject } from 'rxjs';
import { OutletForm } from 'src/app/models/outlet-form';
import { OutletPhoto } from 'src/app/models/outlet-photo';

@Injectable()
export class DatabaseProvider {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(
    private sqlite: SQLite,
    private platform: Platform
  ) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'IonicResearch.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.createTables().then(() => {
            this.databaseReady.next(true);
          });
        });
    });
  }

  createTables() {
    return Promise.all([
      this.database.executeSql(
        `CREATE TABLE IF NOT EXISTS OutletForms (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, name TEXT)`
      ),
      this.database.executeSql(
        `CREATE TABLE IF NOT EXISTS
          OutletPhotos (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, formId INTEGER, name TEXT, path TEXT, filePath TEXT)`
      )
    ]);
  }


  addForm(form: OutletForm) {
    const data = [form.name];
    return this.database.executeSql('INSERT INTO OutletForms (name) VALUES (?)', data).then(x => {
      return x;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  addPhoto(photo: OutletPhoto) {
    const data = [photo.formId, photo.name, photo.path, photo.filePath];
    return this.database.executeSql('INSERT INTO OutletPhotos (formId, name, path, filePath) VALUES (?, ?, ?, ?)', data).then(x => {
      return x;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getForms() {
    return this.database.executeSql('SELECT * FROM OutletForms', []).then((data) => {
      const forms = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          forms.push({
            name: data.rows.item(i).name
          });
        }
      }
      return forms;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getPhotosByForm(formId: number) {
    return this.database.executeSql('SELECT * FROM OutletPhotos WHERE formId = ?', [formId]).then((data) => {
      const photos = [];
      if (data.rows.length > 0) {
        for (let i = 0; i < data.rows.length; i++) {
          photos.push({
            formId: data.rows.item(i).formId,
            name: data.rows.item(i).name,
            path: data.rows.item(i).path,
            filePath: data.rows.item(i).filePath
          });
        }
      }
      return photos;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

}
