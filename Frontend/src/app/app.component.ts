import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentiction/authentiction.service';
import { SnackbarService } from './services/snackbar/snackbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    NgIf,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'EcoSync';
  constructor(
    private router: Router,
    public _authService: AuthenticationService,
    public _snackbarService: SnackbarService
  ) {}
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
  logout() {
    this._authService.logout();
    this._snackbarService.openSnackBar('Logout successful', 'Done');
    this.router.navigate(['/home']);
  }
}
