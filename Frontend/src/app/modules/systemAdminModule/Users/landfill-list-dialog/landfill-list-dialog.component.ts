import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LandfillService } from '../../../../services/landfill/landfill.service';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { AuthenticationService } from '../../../../services/authentiction/authentiction.service';
import { RoleService } from '../../../../services/role/role.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landfill-list-dialog',
  standalone: true,
  imports: [NgFor, MatButton],
  templateUrl: './landfill-list-dialog.component.html',
  styleUrl: './landfill-list-dialog.component.scss',
})
export class LandfillListDialogComponent {
  landfills: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<LandfillListDialogComponent>,
    private landfillService: LandfillService,
    private authService: AuthenticationService,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLandfillList();
  }

  getLandfillList(): void {
    this.landfillService.getLandfillList().subscribe(
      (response: any) => {
        this.landfills = response;
      },
      (error: any) => {
        console.error('Error fetching landfill list:', error);
      }
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  updateRoles(landfillId: string) {
    const roles = ['Landfill Manager'];
    this.roleService.updateUserRoles(this.data.id, roles).subscribe({
      next: (response) => {
        console.log('Roles updated', response);
        this._snackbar.openSnackBar('Manager added to landfill', 'Done');
        this.addManagerToLandfill(landfillId);
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

  addManagerToLandfill(landfillId: string) {
    const managerId = this.data.id; // Assuming this is the manager's ID
    this.landfillService.addManagerToLandfill(landfillId, managerId).subscribe({
      next: (response) => {
        console.log('Manager added to landfill', response);
        // Handle success
      },
      error: (error) => {
        console.error('Error adding manager to landfill', error);
        // Handle error
      },
    });
  }
}
