import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DirectoriesService } from 'src/app/services/directories.service';

@Component({
  selector: 'app-directories',
  templateUrl: './directories.page.html',
  styleUrls: ['./directories.page.scss'],
})
export class DirectoriesPage implements OnInit {
  step: string;
  progress: number;

  constructor(
    private dirService: DirectoriesService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  import() {
    this.dirService.import('houses/77', (step: string, progress: number) => {
      this.step = step;
      this.progress = progress;
      this.ref.detectChanges();
    });
  }
}
