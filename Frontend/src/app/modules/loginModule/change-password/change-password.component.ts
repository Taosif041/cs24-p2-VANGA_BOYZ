import { PasswordService } from './../../../services/password/password.service';
import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule],
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
  changePasswordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    retypePassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private passwordService: PasswordService,
    private router: Router,
    private _snackbarService: SnackbarService
  ) {}

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const currentPassword = this.changePasswordForm.value.currentPassword;
      const newPassword = this.changePasswordForm.value.newPassword;
      const retypePassword = this.changePasswordForm.value.retypePassword;

      // Check if current password is not equal to new password and new password length is greater than 0
      if (
        currentPassword !== newPassword &&
        newPassword == retypePassword &&
        newPassword
      ) {
        const formValue = {
          currentPassword: currentPassword,
          newPassword: newPassword,
        };

        this.passwordService.changePassword(formValue).subscribe({
          next: (response) => {
            console.log('Password changed successfully', response);
            this._snackbarService.openSnackBar(
              'Password changed successfully',
              'Done'
            );
            this.navigateToHome();
          },
          error: (error) => {
            console.error('Error changing password', error);
            this._snackbarService.openSnackBar(
              'Error changing password',
              'Done'
            );
            // Handle error
          },
        });
      } else {
        // Handle case where current password equals new password or new password is empty
        console.error(
          'New password should be different from current password and not empty'
        );
        this._snackbarService.openSnackBar(
          'New password should be different from current password and not empty.',
          'Done'
        );
      }
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
