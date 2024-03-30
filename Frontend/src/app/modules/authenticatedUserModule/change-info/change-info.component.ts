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
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<ChangeInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackbar: SnackbarService
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

      this._userService.updateUser(this.data.id, userData).subscribe({
        next: (val: any) => {
          this._snackbar.openSnackBar('User Updated successfully', 'done');
          this._dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
