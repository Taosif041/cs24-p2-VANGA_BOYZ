import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationService } from './../../../services/authentiction/authentiction.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'], // Corrected property name from 'styleUrl' to 'styleUrls' and made it an array
})
export class LoginFormComponent implements OnInit {
  formGroup!: FormGroup;
  email: string = '';
  password: string = '';

  constructor(
    private _authService: AuthenticationService,
    private _snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    console.log('hello');
    console.log(this.formGroup.value);
  }
  // hello() {
  //   console.log(this.formGroup.value);
  // }

  login(): void {
    console.log('eh');
    console.log(this.formGroup.value);

    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      this._authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this._snackbarService.openSnackBar('Login successful', 'done');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Login failed', err);
          this._snackbarService.openSnackBar('Login failed', 'error');
        },
      });
    }
  }

  navigateToForgetPassword() {
    this.router.navigate(['/forgetpassword']); // Ensure the path matches your route configuration
  }
}
