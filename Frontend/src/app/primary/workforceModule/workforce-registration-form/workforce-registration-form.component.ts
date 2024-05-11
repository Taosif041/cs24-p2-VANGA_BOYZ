import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { WorkforceService } from '../../../services/workforce/workforce.service';
import { ContructorService } from '../../../services/contructor/contructor.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgFor } from '@angular/common';

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
    MatPaginator,
    NgFor,
  ],
  templateUrl: './workforce-registration-form.component.html',
  styleUrl: './workforce-registration-form.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class WorkforceRegistrationFormComponent implements OnInit {
  workforceForm: FormGroup;
  contructorList: any[] | undefined;

  constructor(
    private fb: FormBuilder,
    private workforceService: WorkforceService,
    private snackbar: SnackbarService,
    private router: Router,
    private _contructorervice: ContructorService
  ) {
    this.workforceForm = this.fb.group({
      fullName: ['', Validators.required],
      dateOfHire: ['', Validators.required],
      jobTitle: ['', Validators.required],
      paymentRatePerHour: ['', Validators.required],
      contractorId: [],
      requiredWorkTimeHour: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getConstructorList();
  }

  onFormSubmit(): void {
    const formData = this.workforceForm.value;

    formData.dateOfHire = formData.dateOfHire.toISOString();
    formData.dateOfHire = formData.dateOfHire.substring(0, 10);

    console.log('formData ------->', formData);
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

  navigateToRegisterWorkforce() {
    this.router.navigate(['/register-workforce']);
  }

  getConstructorList(): void {
    this._contructorervice.getContructorList().subscribe(
      (response) => {
        // Assign the response to the constructorList property
        this.contructorList = response;
        console.log(this.contructorList);
      },
      (error) => {
        console.error('Error fetching constructor list:', error);
        // Handle error appropriately, e.g., display an error message
      }
    );
  }
}
