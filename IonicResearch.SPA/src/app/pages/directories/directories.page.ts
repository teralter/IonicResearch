import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DirectoriesService } from 'src/app/services/directories.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-directories',
  templateUrl: './directories.page.html',
  styleUrls: ['./directories.page.scss'],
})
export class DirectoriesPage implements OnInit {
  directoryGroups: any[];
  currentDirectory: any = null;
  importing: boolean;

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
        isChecked: false,
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
        isChecked: false,
        step: null,
        progress: null,
        lastLoad: null
      }, {
        name: 'Кранодарский край', routes: [
          { key: 'addressObjects/23', value: 'элементы адреса' },
          { key: 'houses/23', value: 'дома' }
        ],
        isFile: true,
        isChecked: false,
        step: null,
        progress: null,
        lastLoad: null
      }]
    }];

    this.setDirLoads();
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

  async setDirLoads() {
    const dirLoads = await this.dirService.getDirLoads();

    for (const dg of this.directoryGroups) {
      for (const d of dg.directories) {
        const dirLoad = _.find(dirLoads, { route: _.last(d.routes).key });
        if (dirLoad) {
          d.lastLoad = new Date(dirLoad.load);
          d.isChecked = true;
        }
      }
    }
  }

  async import() {
    this.importing = true;
    for (const dg of this.directoryGroups) {
      for (const d of dg.directories) {
        if (d.isChecked) {
          this.currentDirectory = d;
          for (const r of d.routes) {
            await this.dirService.importDirectory(r.key, r.value, d.isFile);
          }
          d.step = null;
          d.progress = null;
          this.currentDirectory = null;
        }
      }
    }
    this.setDirLoads();
    this.importing = false;
  }
}
