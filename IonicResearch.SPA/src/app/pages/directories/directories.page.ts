import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DirectoriesService } from 'src/app/services/directories.service';
import { auditTime } from 'rxjs/operators';
import { Directory } from 'src/app/models/directory';
import { KeyValuePair } from 'src/app/models/key-value-pair';

@Component({
  selector: 'app-directories',
  templateUrl: './directories.page.html',
  styleUrls: ['./directories.page.scss'],
})
export class DirectoriesPage implements OnInit {
  directoryGroups: any[];
  currentDirectory: any = null;

  constructor(
    private dirService: DirectoriesService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.directoryGroups = [{
      name: 'Общие',
      directories: [{
        name: 'Категории ТТ',
        routes: [{ key: 'outletTypes', value: null }],
        isFile: false,
        isChecked: false,
        step: null,
        progress: null,
        lastLoad: null
      }]
    },
    {
      name: 'Фиас',
      directories: [{
        name: 'Московская область', routes: [
          { key: 'addressObjects/50', value: 'элементы адреса' },
          { key: 'houses/50', value: 'дома' }
        ],
        isFile: true,
        isChecked: true,
        step: null,
        progress: null,
        lastLoad: null
      },
      {
        name: 'Москва', routes: [
          { key: 'addressObjects/77', value: 'элементы адреса' },
          { key: 'houses/77', value: 'дома' }
        ],
        isFile: true,
        isChecked: true,
        step: null,
        progress: null,
        lastLoad: null
      }, {
        name: 'Кранодарский край', routes: [
          { key: 'addressObjects/23', value: 'элементы адреса' },
          { key: 'houses/23', value: 'дома' }
        ],
        isFile: true,
        isChecked: true,
        step: null,
        progress: null,
        lastLoad: null
      }]
    }];
  }

  ionViewDidEnter() {
    this.dirService.progressState.subscribe(state => {
      if (state) {
        this.currentDirectory.step = state.step;
        this.currentDirectory.progress = state.percent;
        this.ref.detectChanges();
      }
    });
  }

  async import() {
    for (const dg of this.directoryGroups) {
      for (const d of dg.directories) {
        if (d.isChecked) {
          this.currentDirectory = d;
          for (const r of d.routes) {
            await this.dirService.importFiasDirectory(r.key, r.value);
          }
          d.step = null;
          d.progress = null;
          d.lastLoad = new Date();
          this.currentDirectory = null;
        }
      }
    }

    // await this.dirService.importFiasDirectory('addressObjects/50', 'элементы адреса');
    // await this.dirService.importFiasDirectory('houses/50', 'дома');
    // this.step = null;
    // this.lastLoad = new Date();
  }
}
