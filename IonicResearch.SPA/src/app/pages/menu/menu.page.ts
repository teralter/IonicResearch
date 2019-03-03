import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedPath = '';

  pages = [
    {
      title: 'Главная',
      url: '/menu/home'
    },
    {
      title: 'Настройки',
      url: '/menu/settings'
    },
    {
      title: 'Справочники',
      url: '/menu/directories'
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logout();
  }

}
