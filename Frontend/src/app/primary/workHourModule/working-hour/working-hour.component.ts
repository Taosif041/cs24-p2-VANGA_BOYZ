import { WorkingHourService } from '../../../services/workingHour/working-hour.service';
import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-working-hour',
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
    NgFor,
    MatCardModule,
  ],
  templateUrl: './working-hour.component.html',
  styleUrl: './working-hour.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class WorkingHourComponent implements OnInit {
  workingHourForm: FormGroup;
  selectedEmployee1: string = '';
  selectedEmployee2: string = '';
  selectedEmployee3: string = '';

  constructor(
    private fb: FormBuilder,
    private workingHourService: WorkingHourService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.workingHourForm = this.fb.group({
      employee: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFormSubmit(): void {
    if (this.workingHourForm.valid) {
      const formData = this.workingHourForm.value;
      console.log(formData);
      this.workingHourService.addWorkingHour(formData).subscribe({
        next: (val: any) => {
          this.snackbar.openSnackBar(
            'Working Hour logged successfully',
            'done'
          );
        },
        error: (err) => {
          console.log(err);
          this.snackbar.openSnackBar('Error', 'done');
        },
      });
    } else {
      console.log('error found');
    }
  }
  navigateToDailyMonitor() {
    this.router.navigate(['/daily-monitor']);
  }

  employees = [
    'John Doe',
    'Jane Smith',
    'Emily Johnson',
    'Michael Brown',
    'Emma Davis',
  ];
}
