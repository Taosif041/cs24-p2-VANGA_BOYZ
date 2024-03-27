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
import { UserService } from '../../../../services/user/user.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-dialogue',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.scss',
})
export class DialogueComponent implements OnInit {
  userForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<DialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackbar: SnackbarService
  ) {
    this.userForm = this._fb.group({
      name: '',
      email: '',
      password: '',
    });
  }
  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this._userService
          .updateUser(this.data.id, this.userForm.value)
          .subscribe({
            next: (val: any) => {
              this._snackbar.openSnackBar('User Updated successfully', 'done');
              this._dialogRef.close(true);
            },
            error: (err) => {
              console.log(err);
            },
          });
      } else {
        this._userService.addUser(this.userForm.value).subscribe({
          next: (val: any) => {
            this._snackbar.openSnackBar('User added successfully', 'done');
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
