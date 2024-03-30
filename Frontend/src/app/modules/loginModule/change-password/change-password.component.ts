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
  });

  constructor(
    private passwordService: PasswordService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const formValue = {
        currentPassword: this.changePasswordForm.value.currentPassword ?? '',
        newPassword: this.changePasswordForm.value.newPassword ?? '',
      };
      this.passwordService.changePassword(formValue).subscribe({
        next: (response) => {
          console.log('Password changed successfully', response);
          // Navigate or handle success
        },
        error: (error) => {
          console.error('Error changing password', error);
          // Handle error
        },
      });
    }
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
