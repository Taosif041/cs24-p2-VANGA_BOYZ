import { SnackbarService } from './../../../services/snackbar/snackbar.service';
import { Component } from '@angular/core';
import { PasswordService } from './../../../services/password/password.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent {
  recoverPasswordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private passwordService: PasswordService,
    private router: Router,
    private _snackbarService: SnackbarService
  ) {}

  onSubmit() {
    if (this.recoverPasswordForm.valid) {
      const currentPassword = this.recoverPasswordForm.value.currentPassword;
      const newPassword = this.recoverPasswordForm.value.newPassword;

      // Check if current password is not equal to new password and new password length is greater than 0
      if (currentPassword === newPassword && newPassword) {
        this.passwordService.recoverPassword(newPassword).subscribe({
          next: (response) => {
            console.log('Password recovered successfully', response);
            this._snackbarService.openSnackBar(
              'Password recovered successfully',
              'Done'
            );
            if (typeof localStorage !== 'undefined') {
              localStorage.removeItem('tempToken'); // Ensure to clear any other auth-related data
            }
            // Navigate or handle success
            this.router.navigate(['/home']);
          },
          error: (error) => {
            console.error('Error changing password', error);
            // Handle error
            this._snackbarService.openSnackBar(
              'Error changing password',
              'Done'
            );
          },
        });
      } else {
        // Handle case where current password equals new password or new password is empty
        console.error('Both password should be same.');
        this._snackbarService.openSnackBar(
          'Both password should be same.',
          'Done'
        );
      }
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
