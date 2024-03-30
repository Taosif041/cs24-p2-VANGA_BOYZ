import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordService } from '../../../services/password/password.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-provide-otp',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './provide-otp.component.html',
  styleUrl: './provide-otp.component.scss',
})
export class ProvideOTPComponent {
  confirmForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private passwordService: PasswordService,
    private router: Router
  ) {
    this.confirmForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['', Validators.required],
    });
  }

  confirm() {
    if (this.confirmForm.invalid) {
      return;
    }

    const email = this.confirmForm.get('email')!.value;
    const otp = this.confirmForm.get('otp')!.value;

    this.isLoading = true;
    this.errorMessage = '';

    this.passwordService.confirmOTP(email, otp).subscribe(
      (response) => {
        // Handle successful confirmation
        console.log('OTP confirmed successfully');
      },
      (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  }
  navigateToChange() {
    this.router.navigate(['/changepassword']);
  }
}
