import { Component, Inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

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
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { StsService } from './../../../../services/sts/sts.service';

@Component({
  selector: 'app-add-sts-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './add-sts-dialog.component.html',
  styleUrl: './add-sts-dialog.component.scss',
})
export class AddStsDialogComponent {
  stsForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _stsService: StsService,
    private _dialogRef: MatDialogRef<AddStsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackbar: SnackbarService
  ) {
    this.stsForm = this._fb.group({
      name: ['', Validators.required],
      wardNumber: ['', Validators.required],
      capacity: ['', Validators.required],
      gpsLat: ['', Validators.required],
      gpsLong: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.stsForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.stsForm.valid) {
      const formData = this.stsForm.value;
      const formattedData = {
        name: formData.name,
        wardNumber: Number(formData.wardNumber),
        capacity: Number(formData.capacity),
        gpsCoordinates: [Number(formData.gpsLat), Number(formData.gpsLong)],
      };

      if (this.data) {
        this._stsService.updateSts(this.data._id, formattedData).subscribe({
          next: (val: any) => {
            this._snackbar.openSnackBar('sts Updated successfully', 'done');
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.log(err);
          },
        });
      } else {
        this._stsService.addSts(formattedData).subscribe({
          next: (val: any) => {
            this._snackbar.openSnackBar('STS added successfully', 'done');
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}
