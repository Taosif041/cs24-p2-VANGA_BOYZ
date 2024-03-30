import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { PasswordService } from '../../../services/password/password.service';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-foget-password',
  standalone: true,
  imports: [MatButtonModule, FormsModule],
  templateUrl: './foget-password.component.html',
  styleUrl: './foget-password.component.scss',
})
export class FogetPasswordComponent {
  email: string = '';

  constructor(
    private router: Router,
    private _passwordService: PasswordService,
    private _snackbar: SnackbarService
  ) {}
  sendOTP(): void {
    if (this.email) {
      this._passwordService.initiateResetPassword(this.email).subscribe({
        next: (response) => {
          // Handle success response here, such as displaying a message to the user
          console.log('Reset password initiated successfully:', response);
          this._snackbar.openSnackBar('OTP Sent', 'done');
          this.navigateToProvideOTP();
        },
        error: (error) => {
          // Handle error response here, such as displaying an error message to the user
          console.error('Error initiating reset password:', error);
        },
      });
    } else {
      // Handle case when email is not provided
      console.error('Email is required.');
    }
  }

  navigateToProvideOTP() {
    this.router.navigate(['/provideotp']);
  }
}
