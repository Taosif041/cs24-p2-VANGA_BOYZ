import {
  Component,
  Input,
  computed,
  signal,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Sidebar, SidebarModule } from 'primeng/sidebar';

export type MenuItems = {
  icon: string;
  label: string;
  route: string;
};

@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.scss',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    SidebarModule,
  ],
})
export class SidenavbarComponent {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  menuItems: MenuItems[] = [
    { icon: 'home', label: 'Home', route: '/' },
    { icon: 'info', label: 'About', route: '/about' },
    { icon: 'contact_page', label: 'Contact', route: '/contact' },
    // Add more items as needed
  ];

  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;
}
