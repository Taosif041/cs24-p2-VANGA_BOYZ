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
import { VehicleService } from './../../../../services/vehicle/vehicle.service';

@Component({
  selector: 'app-vehicle-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './vehicle-dialog.component.html',
  styleUrl: './vehicle-dialog.component.scss',
})
export class VehicleDialogComponent {
  vehicleForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _vehicleService: VehicleService,
    private _dialogRef: MatDialogRef<VehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackbar: SnackbarService
  ) {
    this.vehicleForm = this._fb.group({
      registrationNumber: ['', Validators.required],
      type: ['', Validators.required],
      capacity: ['', Validators.required],
      fuelCostPerKmLoaded: ['', [Validators.required, Validators.min(0)]],
      fuelCostPerKmUnloaded: ['', [Validators.required, Validators.min(0)]],
    });
  }
  ngOnInit(): void {
    this.vehicleForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.vehicleForm.valid) {
      if (this.data) {
        this._vehicleService
          .updateVehicle(this.data._id, this.vehicleForm.value)
          .subscribe({
            next: (val: any) => {
              this._snackbar.openSnackBar(
                'vehicle Updated successfully',
                'done'
              );
              this._dialogRef.close(true);
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        this._vehicleService.addVehicle(this.vehicleForm.value).subscribe({
          next: (val: any) => {
            this._snackbar.openSnackBar('vehicle added successfully', 'done');
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
