import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [NgFor, MatButton],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss',
})
export class DeleteUserDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private userService: UserService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    console.log('Received row ID:', this.data.id);
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        this.snackbar.openSnackBar('User deleted successfully', 'done');
        this.dialogRef.close(true); // Close the dialog with a flag indicating deletion
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        this.snackbar.openSnackBar('Error deleting user', 'error');
        this.dialogRef.close(false); // Close the dialog with a flag indicating error
      },
    });
  }
}
