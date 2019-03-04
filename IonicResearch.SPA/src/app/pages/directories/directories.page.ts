import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DirectoriesService } from 'src/app/services/directories.service';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'app-directories',
  templateUrl: './directories.page.html',
  styleUrls: ['./directories.page.scss'],
})
export class DirectoriesPage implements OnInit {
  step: string;
  progress: number;
  lastLoad: Date;

  constructor(
    private dirService: DirectoriesService,
    private ref: ChangeDetectorRef,
  ) {

    this.dirService.progressState.subscribe(state => {
      if (state) {
        this.step = state.step;
        this.progress = state.percent;
        ref.detectChanges();
      }
    });
  }

  ngOnInit() {
  }

  async import() {
    await this.dirService.import('addressObjects/77', 'элементы адреса');
    await this.dirService.import('houses/77', 'дома');
    this.step = null;
    this.lastLoad = new Date();
  }
}
