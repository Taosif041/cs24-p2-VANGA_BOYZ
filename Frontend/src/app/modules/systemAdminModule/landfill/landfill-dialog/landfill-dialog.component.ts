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
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { LandfillService } from './../../../../services/landfill/landfill.service';
@Component({
  selector: 'app-landfill-dialog',
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
  templateUrl: './landfill-dialog.component.html',
  styleUrl: './landfill-dialog.component.scss',
})
export class LandfillDialogComponent {
  landfillForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _landfillService: LandfillService,
    public _dialogRef: MatDialogRef<LandfillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public _snackbar: SnackbarService
  ) {
    this.landfillForm = this._fb.group({
      id: '',
      name: ['', Validators.required],
      capacity: ['', Validators.required],
      operationalTimespan: ['', Validators.required],
      gpsLat: ['', Validators.required],
      gpsLong: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.landfillForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.landfillForm.valid) {
      if (this.data) {
        this._landfillService
          .updateLandfill(this.data.id, this.landfillForm.value)
          .subscribe({
            next: (val: any) => {
              this._snackbar.openSnackBar(
                'landfill Updated successfully',
                'done'
              );
              this._dialogRef.close(true);
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        this._landfillService.addLandfill(this.landfillForm.value).subscribe({
          next: (val: any) => {
            this._snackbar.openSnackBar('landfill added successfully', 'done');
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
