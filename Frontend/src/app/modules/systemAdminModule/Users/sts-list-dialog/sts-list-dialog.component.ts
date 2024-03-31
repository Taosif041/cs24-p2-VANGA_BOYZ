import { StsService } from './../../../../services/sts/sts.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { AuthenticationService } from '../../../../services/authentiction/authentiction.service';
import { RoleService } from '../../../../services/role/role.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sts-list-dialog',
  standalone: true,
  imports: [NgFor, MatButton],
  templateUrl: './sts-list-dialog.component.html',
  styleUrl: './sts-list-dialog.component.scss',
})
export class StsListDialogComponent {
  sts: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<StsListDialogComponent>,
    private stsService: StsService,
    private authService: AuthenticationService,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getstsList();
    console.log('Received row ID:', this.data.id);
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

  updateRoles(stsId: string) {
    const roles = ['STS Manager'];
    this.roleService.updateUserRoles(this.data.id, roles).subscribe({
      next: (response) => {
        console.log('Roles updated', response);
        this._snackbar.openSnackBar('STS manager role assigned', 'Done');
        this.addManagerToSts(stsId); // Call addManagerToSts here
        this.closeDialog();
        this.dialogRef.close(true);
        // Handle response here
      },
      error: (error) => {
        console.error('Error updating roles', error);
        this._snackbar.openSnackBar('Error updating roles', 'Done');
      },
    });
  }

  addManagerToSts(stsId: string) {
    const userId = this.data.id; // Assuming this is the manager's ID
    this.stsService.addManagerToSts(stsId, userId).subscribe({
      next: (response) => {
        console.log('Manager added to STS', response);
        this._snackbar.openSnackBar('Manager added to STS', 'Done');
        // Handle success
      },
      error: (error) => {
        console.error('Error adding manager to STS', error);
        this._snackbar.openSnackBar('Manager added to STS', 'Done');
        // Handle error
      },
    });
  }
}
