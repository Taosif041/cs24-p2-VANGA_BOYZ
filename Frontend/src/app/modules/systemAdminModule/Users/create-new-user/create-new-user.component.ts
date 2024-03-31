import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogueComponent } from '../userDialog/dialogue.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { UserService } from '../../../../services/user/user.service';
import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule, NgFor } from '@angular/common';
import { LandfillListDialogComponent } from '../landfill-list-dialog/landfill-list-dialog.component';
import { StsListDialogComponent } from '../sts-list-dialog/sts-list-dialog.component';

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
    MatListModule,
    MatMenuModule,
    NgFor,
  ],
  templateUrl: './create-new-user.component.html',
  styleUrl: './create-new-user.component.scss',
})
export class CreateNewUserComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'roles',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialogue: MatDialog,
    private _userService: UserService,
    private _snackbar: SnackbarService,
    public dialog: MatDialog
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
        this._snackbar.openSnackBar('User deleted successfully', 'done');
        this.getUserList();
      },
      error: console.log,
    });
  }
  openEditForm(data: any) {
    const DialogRef = this._dialogue.open(DialogueComponent, {
      data,
    });
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
      error: console.log,
    });
  }

  openLandfillListDialog(): void {
    const dialogRef = this.dialog.open(LandfillListDialogComponent, {
      width: '600px',
    });
  }
  openStsListDialog(): void {
    const dialogRef = this.dialog.open(StsListDialogComponent, {
      width: '600px',
    });
  }
}
