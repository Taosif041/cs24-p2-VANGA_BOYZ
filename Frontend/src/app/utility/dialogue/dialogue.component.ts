import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialogue',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
  ],
  templateUrl: './dialogue.component.html',
  styleUrl: './dialogue.component.scss',
})
export class DialogueComponent {
  userForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogRef: DialogRef<DialogueComponent>
  ) {
    this.userForm = this._fb.group({
      name: '',
      email: '',
      password: '',
    });
  }
  onFormSubmit() {
    if (this.userForm.valid) {
      this._userService.addUser(this.userForm.value).subscribe({
        next: (val: any) => {
          alert('Employee addded successfully');
          this._dialogRef.close();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
