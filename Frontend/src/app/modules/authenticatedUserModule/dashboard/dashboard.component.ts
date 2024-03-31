import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentiction/authentiction.service';
import { NgFor, NgIf } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { ChangeInfoComponent } from '../change-info/change-info.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, NgFor, MatButtonModule, MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  user: any; // Define a variable to store user information
  id: string = '';
  userInfo: any = [];

  constructor(
    private _authService: AuthenticationService,
    private _userService: UserService,
    private router: Router,
    private _dialogue: MatDialog,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Subscribe to user$ to access user data
    this.getUserData();
  }
  getUserData() {
    this.user = this._authService.getUser();
    if (this.user != null) {
      const userId = this.user.id;

      // Call getUserById function with the retrieved user ID
      this._userService.getUserById(userId).subscribe((userData) => {
        // Handle the response here
        this.userInfo = userData;
        console.log('User Data:', userData);
      });
    } else {
      console.log('User not found');
    }
  }

  navigateToChangePassword(): void {
    // Navigate to the change password page
    this.router.navigate(['/changepassword']);
  }
  openDilogForm() {
    const DialogRef = this._dialogue.open(ChangeInfoComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserData();
        }
      },
      error: console.log,
    });
  }
}
