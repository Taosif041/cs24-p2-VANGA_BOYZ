import { AddStsDialogComponent } from './../add-sts-dialog/add-sts-dialog.component';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { SnackbarService } from '../../../../services/snackbar/snackbar.service';
import { MatMenuModule } from '@angular/material/menu';
import { StsService } from '../../../../services/sts/sts.service';
@Component({
  selector: 'app-add-sts',
  standalone: true,
  imports: [
    AddStsDialogComponent,
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
  ],
  templateUrl: './add-sts.component.html',
  styleUrl: './add-sts.component.scss',
})
export class AddSTSComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'wardNumber',
    'capacity',
    'gpsLat',
    'gpsLong',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialogue: MatDialog,
    private _stservice: StsService,
    private _snackbar: SnackbarService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getstsList();
  }

  openDilogForm() {
    const DialogRef = this._dialogue.open(AddStsDialogComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getstsList();
        }
      },
      error: console.log,
    });
  }
  getstsList() {
    this._stservice.getStsList().subscribe({
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

  deleteSts(id: string) {
    this._stservice.deleteSts(id).subscribe({
      next: (res) => {
        this._snackbar.openSnackBar('STS deleted successfully', 'done');
        this.getstsList();
      },
      error: console.log,
    });
  }
  openEditForm(data: any) {
    const DialogRef = this._dialogue.open(AddStsDialogComponent, {
      data,
    });
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getstsList();
        }
      },
      error: console.log,
    });
  }
}
