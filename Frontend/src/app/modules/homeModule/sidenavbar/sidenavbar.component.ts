import { Component, Input, computed, signal, OnInit } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';


export type MenuItems = {
  icon: string;
  label: string;
  route: string;
}


@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [MatListModule, MatSidenavModule],
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.scss'
})
export class SidenavbarComponent implements OnInit {
  // public authService: AuthenticationService
  constructor() {}
  ngOnInit() {
    // this.checkAuthentication();
  }


  

  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val);
  }
  menuItemsUsers = signal<MenuItems[]>([
    { icon: 'analytics', label:'Leaderboard', route:'leaderboard' },
    { icon: 'dashboard', label:'Contests', route:'contests' },
    { icon: 'campaign', label:'Announcements', route:'announcements' },
    { icon: 'verified_user', label:'LogIn as Admin', route:'sign-in' }
  ]);

  menuItemsAdmins = signal<MenuItems[]>([
    { icon: 'analytics', label:'Leaderboard', route:'leaderboard' },
    { icon: 'dashboard', label:'Contests', route:'contests' },
    { icon: 'campaign', label:'Announcements', route:'announcements' },
    // { icon: 'verified_user', label:'LogIn as Admin', route:'sign-in' },
    { icon: 'admin_panel_settings', label:'Admin Dashboard', route:'admin-dash-board' },
    { icon: 'logout', label:'Log Out', route:'log-out' }
  ]);


  profilePicSize = computed(()=>this.sideNavCollapsed()?'32':'100');

  // token:any;
  // checkAuthentication() {
  //   if (this.authService.isAuthenticated()) {
  //     this.token='admin';
  //   } else {
  //     this.token='user';
  //   }
  // }


}
