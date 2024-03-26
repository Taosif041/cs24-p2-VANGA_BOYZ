import { Component, Input, computed, signal, OnInit } from '@angular/core';
import { SidenavbarComponent } from '../sidenavbar/sidenavbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

export type MenuItems = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    SidenavbarComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    NgIf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor() {} // public authService: AuthenticationService
  ngOnInit() {
    // this.checkAuthentication();
  }

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean) {
    this.sideNavCollapsed.set(val);
  }
  menuItemsUsers = signal<MenuItems[]>([
    { icon: 'analytics', label: 'Leaderboard', route: 'leaderboard' },
    { icon: 'dashboard', label: 'Contests', route: 'contests' },
    { icon: 'campaign', label: 'Announcements', route: 'announcements' },
    { icon: 'verified_user', label: 'LogIn as Admin', route: 'sign-in' },
  ]);

  menuItemsAdmins = signal<MenuItems[]>([
    { icon: 'analytics', label: 'Leaderboard', route: 'leaderboard' },
    { icon: 'dashboard', label: 'Contests', route: 'contests' },
    { icon: 'campaign', label: 'Announcements', route: 'announcements' },
    // { icon: 'verified_user', label:'LogIn as Admin', route:'sign-in' },
    {
      icon: 'admin_panel_settings',
      label: 'Admin Dashboard',
      route: 'admin-dash-board',
    },
    { icon: 'logout', label: 'Log Out', route: 'log-out' },
  ]);

  profilePicSize = computed(() => (this.sideNavCollapsed() ? '32' : '100'));

  // token:any;
  // checkAuthentication() {
  //   if (this.authService.isAuthenticated()) {
  //     this.token='admin';
  //   } else {
  //     this.token='user';
  //   }
  // }
}
