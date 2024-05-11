import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { ContructorService } from '../../../services/contructor/contructor.service';
import { StsService } from '../../../services/sts/sts.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-register-contructor-form',
  standalone: true,
  imports: [
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    NgFor,
  ],
  templateUrl: './register-contructor-form.component.html',
  styleUrl: './register-contructor-form.component.scss',
})
export class RegisterContructorFormComponent implements OnInit {
  contructorForm: FormGroup;
  stsList: { _id: string; name: string }[] = [];

  constructor(
    private _fb: FormBuilder,
    private _contructorService: ContructorService,
    private _snackbar: SnackbarService,
    private router: Router,
    private _stsService: StsService
  ) {
    this.contructorForm = this._fb.group({
      companyName: ['', Validators.required],
      registrationId: ['', Validators.required],
      tin: ['', Validators.required],
      contactNumber: ['', Validators.required],
      workforceSize: ['', Validators.required],
      paymentPerTonnageOfWaste: ['', Validators.required],
      requiredAmountOfWastePerDay: ['', Validators.required],
      contractDuration: ['', Validators.required],
      designatedSTS: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllSts();
  }

  onFormSubmit(): void {
    if (this.contructorForm.valid) {
      const formData = this.contructorForm.value;
      const formattedData = {
        companyName: formData.companyName,
        registrationId: formData.registrationId,
        tin: formData.tin,
        contactNumber: formData.contactNumber,
        workforceSize: formData.workforceSize,
        paymentPerTonnageOfWaste: formData.paymentPerTonnageOfWaste,
        requiredAmountOfWastePerDay: formData.requiredAmountOfWastePerDay,
        contractDuration: formData.contractDuration,
        designatedSTS: formData.designatedSTS,
      };
      this._contructorService.addContructor(formattedData).subscribe({
        next: (val: any) => {
          this._snackbar.openSnackBar('Contructor added successfully', 'done');
          this.navigateToRegisterConstructor();
          // Optionally, you can navigate to another page or close this one
        },
        error: (err) => {
          console.log(err);
          this._snackbar.openSnackBar('Error', 'done');
        },
      });
    }
  }
  navigateToRegisterConstructor() {
    this.router.navigate(['/register-contructor']);
  }

  getAllSts() {
    this._stsService.getStsList().subscribe({
      next: (stsLists: any[]) => {
        // Extract _id and name from each STS and store in stsList array
        this.stsList = stsLists.map((sts) => ({
          _id: sts._id,
          name: sts.name,
        }));
        console.log(this.stsList);
      },
      error: (error) => {
        console.error('Error fetching STS:', error);
      },
    });
  }
}
