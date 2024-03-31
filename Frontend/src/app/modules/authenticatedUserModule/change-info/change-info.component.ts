import { Component, Inject, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { AuthenticationService } from '../../../services/authentiction/authentiction.service';

@Component({
  selector: 'app-change-info',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './change-info.component.html',
  styleUrl: './change-info.component.scss',
})
export class ChangeInfoComponent implements OnInit {
  userForm: FormGroup;
  user: any;
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<ChangeInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackbar: SnackbarService,
    private _authService: AuthenticationService
  ) {
    this.userForm = this._fb.group({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
    });
  }
  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.userForm.valid) {
      const { firstName, lastName, phoneNumber, address } = this.userForm.value;
      const userData = { firstName, lastName, phoneNumber, address }; // Create an object with only firstName and lastName
      console.log(userData);
      this.user = this._authService.getUser();
      if (this.user != null) {
        const userId = this.user.id;

        this._userService.updateUser(userId, userData).subscribe({
          next: (val: any) => {
            this._dialogRef.close(true);
            this._snackbar.openSnackBar('User Updated successfully', 'done');
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    }
  }
}
