import { Component, Inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { ContructorService } from '../../../services/contructor/contructor.service';
@Component({
  selector: 'app-register-contructor-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogClose,
    MatMenuModule,
  ],
  templateUrl: './register-contructor-dialog.component.html',
  styleUrl: './register-contructor-dialog.component.scss',
})
export class RegisterContructorDialogComponent {
  contructorForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _contructorService: ContructorService,
    public _dialogRef: MatDialogRef<RegisterContructorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _snackbar: SnackbarService
  ) {
    this.contructorForm = this._fb.group({
      companyName: ['', Validators.required], // Updated
      registrationId: ['', Validators.required], // Updated
      tin: ['', Validators.required], // Updated
      contactNumber: ['', Validators.required], // Updated
      workforceSize: ['', Validators.required], // Updated
      paymentPerTonnage: ['', Validators.required], // Updated
      requiredAmountPerDay: ['', Validators.required], // Updated
      contractDuration: ['', Validators.required], // Updated
      designatedSTS: ['', Validators.required], // Updated
    });
  }
  ngOnInit(): void {
    this.contructorForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.contructorForm.valid) {
      const formData = this.contructorForm.value;
      const formattedData = {
        companyName: formData.companyName,
        registrationId: formData.registrationId,
        tin: formData.tin,
        contactNumber: formData.contactNumber,
        workforceSize: formData.workforceSize,
        paymentPerTonnage: Number(formData.paymentPerTonnage),
        requiredAmountPerDay: Number(formData.requiredAmountPerDay),
        contractDuration: formData.contractDuration,
        designatedSTS: formData.designatedSTS,
      };
      if (this.data) {
        this._contructorService
          .updateContructor(this.data._id, formattedData)
          .subscribe({
            next: (val: any) => {
              this._snackbar.openSnackBar(
                'Contructor Updated successfully',
                'done'
              );
              this._dialogRef.close(true);
            },
            error: (err) => {
              console.log(err);
              this._snackbar.openSnackBar('Error', 'done');
            },
          });
      } else {
        this._contructorService.addContructor(formattedData).subscribe({
          next: (val: any) => {
            this._snackbar.openSnackBar(
              'Contructor added successfully',
              'done'
            );
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.log(err);
            this._snackbar.openSnackBar('Error', 'done');
          },
        });
      }
    }
  }
}
