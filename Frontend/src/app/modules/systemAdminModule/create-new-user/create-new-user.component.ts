import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogueComponent } from '../../../utility/dialogue/dialogue.component';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-create-new-user',
  standalone: true,
  imports: [DialogueComponent, MatDialogModule],
  templateUrl: './create-new-user.component.html',
  styleUrl: './create-new-user.component.scss',
})
export class CreateNewUserComponent implements OnInit {
  constructor(
    private _dialogue: MatDialog,
    private _userService: UserService
  ) {}
  ngOnInit(): void {
    this.getUserList();
  }

  openDilogForm() {
    this._dialogue.open(DialogueComponent);
  }
  getUserList() {
    this._userService.getUserList().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
