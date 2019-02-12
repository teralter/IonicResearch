import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentialsForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.credentialsForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.authService.login(this.credentialsForm.value).subscribe(next => {
      this.credentialsForm.reset();
      this.router.navigate(['menu', 'home']);
    }, error => {
      if (error === 'Unauthorized') {
        this.showToast('Неверный логин пользователя или пароль');
      } else {
        this.showToast(error);
      }
    });
  }

  async showToast(msg) {
    const alert = await this.toastCtrl.create({
      message: msg,
      position: 'bottom',
      duration: 3000
    });
    await alert.present();
  }

}
