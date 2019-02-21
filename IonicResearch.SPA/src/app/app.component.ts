import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { DbService } from './services/db.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private dbService: DbService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.dbService.init().then(state => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });

      this.authService.authState.subscribe(state => {
        // if (state != null) {
        //   this.router.navigate(state ? ['menu', 'home'] : ['login']);
        // }
        if (state === false) {
          this.router.navigate(['login']);
        }
      });
    });
  }
}
