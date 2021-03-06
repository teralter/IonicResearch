import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Platform, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../models/user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'user-info';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  user: User = null;
  authState = new BehaviorSubject<boolean>(null);

  constructor(
    private storage: Storage,
    private platform: Platform,
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    this.platform.ready().then(() => {
      this.checkToken();
      this.initUser();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(token => {
      if (token) {
        const isExpired = this.jwtHelper.isTokenExpired(token);
        this.authState.next(!isExpired);
      } else {
        this.authState.next(false);
      }
    });
  }

  initUser() {
    this.storage.get(USER_KEY).then(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        tap((res: any) => {
          this.storage.set(USER_KEY, res.user);
          this.user = res.user;
          this.storage.set(TOKEN_KEY, res.token);
          this.authState.next(true);
        })
      );
  }

  logout() {
    this.storage.remove(USER_KEY);
    this.user = null;
    this.storage.remove(TOKEN_KEY);
    this.authState.next(false);
  }

  isAuthenticated() {
    return this.authState.value !== false;
  }
}
