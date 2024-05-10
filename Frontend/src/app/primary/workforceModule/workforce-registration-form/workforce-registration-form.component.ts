import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { WorkforceService } from '../../../services/workforce/workforce.service';

@Component({
  selector: 'app-workforce-registration-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './workforce-registration-form.component.html',
  styleUrl: './workforce-registration-form.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class WorkforceRegistrationFormComponent implements OnInit {
  workforceForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private workforceService: WorkforceService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.workforceForm = this.fb.group({
      fullName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      dateOfHire: ['', Validators.required],
      jobTitle: ['', Validators.required],
      paymentRatePerHour: ['', Validators.required],
      contactInformation: ['', Validators.required],
      assignedCollectionRoute: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFormSubmit(): void {
    if (this.workforceForm.valid) {
      const formData = this.workforceForm.value;
      this.workforceService.addWorkforce(formData).subscribe({
        next: (val: any) => {
          this.snackbar.openSnackBar('Workforce added successfully', 'done');
          this.navigateToRegisterWorkforce();
        },
        error: (err) => {
          console.log(err);
          this.snackbar.openSnackBar('Error', 'done');
        },
      });
    }
  }

  navigateToRegisterWorkforce() {
    this.router.navigate(['/register-workforce']);
  }
}
