import { StsService } from './../../../../services/sts/sts.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { AuthenticationService } from '../../../../services/authentiction/authentiction.service';
import { VehicleService } from '../../../../services/vehicle/vehicle.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-sts-list-for-vehicle',
  standalone: true,
  imports: [NgFor, MatButton],
  templateUrl: './sts-list-for-vehicle.component.html',
  styleUrl: './sts-list-for-vehicle.component.scss',
})
export class StsListForVehicleComponent {
  sts: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<StsListForVehicleComponent>,
    private stsService: StsService,
    private authService: AuthenticationService,
    private vehicleService: VehicleService,
    private snackbar: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getstsList();
  }

  getstsList(): void {
    this.stsService.getStsList().subscribe(
      (response: any) => {
        this.sts = response;
      },
      (error: any) => {
        console.error('Error fetching sts list:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addVehicleToSts(stsId: string): void {
    this.vehicleService.addVehicleToSts(stsId, this.data.id).subscribe(
      (response) => {
        console.log('Vehicle added to STS successfully:', response);
        this.snackbar.openSnackBar('Vehicle added to STS successfully', 'Done');
        this.closeDialog();
        this.dialogRef.close(true); // Handle success
      },
      (error) => {
        console.error('Error adding vehicle to STS:', error);
        this.snackbar.openSnackBar('Error adding vehicle to STS', 'Done');
        // Handle error
      }
    );
  }
}
