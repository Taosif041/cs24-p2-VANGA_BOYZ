import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogueComponent } from '../../../utility/dialogue/dialogue.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-create-new-user',
  standalone: true,
  imports: [
    DialogueComponent,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './create-new-user.component.html',
  styleUrl: './create-new-user.component.scss',
})
export class CreateNewUserComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialogue: MatDialog,
    private _userService: UserService
  ) {}
  ngOnInit(): void {
    this.getUserList();
  }

  openDilogForm() {
    const DialogRef = this._dialogue.open(DialogueComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
      error: console.log,
    });
  }
  getUserList() {
    this._userService.getUserList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: string) {
    this._userService.deleteUser(id).subscribe({
      next: (res) => {
        alert('User deleted successfully');
        this.getUserList();
      },
      error: console.log,
    });
  }
  openEditForm(data: any) {
    this._dialogue.open(DialogueComponent, {
      data,
    });
  }
}
