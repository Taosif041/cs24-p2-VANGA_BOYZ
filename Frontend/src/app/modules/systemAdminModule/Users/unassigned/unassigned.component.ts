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
  selector: 'app-unassigned',
  standalone: true,
  imports: [NgFor, MatButton],
  templateUrl: './unassigned.component.html',
  styleUrl: './unassigned.component.scss',
})
export class UnassignedComponent {
  constructor(
    private dialogRef: MatDialogRef<UnassignedComponent>,
    private authService: AuthenticationService,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Received row ID:', this.data.id);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  updateRoles() {
    const roles: string[] = [];
    this.roleService.updateUserRoles(this.data.id, roles).subscribe({
      next: (response) => {
        console.log('Roles updated', response);
        this._snackbar.openSnackBar('All role unassigned for the user', 'Done');
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
}
