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
import { PrimaryWasteLogService } from '../../../services/primaryWastelog/primary-wastelog.service';

@Component({
  selector: 'app-primary-wastelog-form',
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
  templateUrl: './primary-wastelog-form.component.html',
  styleUrl: './primary-wastelog-form.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class PrimaryWastelogFormComponent implements OnInit {
  primaryWasteLogForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private primaryWasteLogService: PrimaryWasteLogService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.primaryWasteLogForm = this.fb.group({
      timeAndDateOfCollection: ['', Validators.required],
      amountOfWasteCollected: ['', Validators.required],
      contractorID: ['', Validators.required],
      typeOfWasteCollected: ['', Validators.required],
      designatedSTSforDeposit: ['', Validators.required],
      vehicleUsedForTransportation: ['', Validators.required],
      action: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFormSubmit(): void {
    if (this.primaryWasteLogForm.valid) {
      const formData = this.primaryWasteLogForm.value;
      this.primaryWasteLogService.addPrimaryWasteLog(formData).subscribe({
        next: (val: any) => {
          this.snackbar.openSnackBar(
            'Primary Waste Log added successfully',
            'done'
          );
          this.navigateToRegisterPrimaryWasteLog();
        },
        error: (err) => {
          console.log(err);
          this.snackbar.openSnackBar('Error', 'done');
        },
      });
    }
  }

  navigateToRegisterPrimaryWasteLog() {
    this.router.navigate(['/primaryWastelog']);
  }
}
