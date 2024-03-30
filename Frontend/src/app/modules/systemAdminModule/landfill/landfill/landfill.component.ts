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
import { LandfillService } from '../../../../services/landfill/landfill.service';
import { LandfillDialogComponent } from '../landfill-dialog/landfill-dialog.component';

@Component({
  selector: 'app-landfill',
  standalone: true,
  imports: [
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
  templateUrl: './landfill.component.html',
  styleUrl: './landfill.component.scss',
})
export class LandfillComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'capacity',

    'operationalTimespan',
    'gpsLat',
    'gpsLong',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialogue: MatDialog,
    private _landfillervice: LandfillService,
    private _snackbar: SnackbarService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getLandfillList();
  }

  openDilogForm() {
    const DialogRef = this._dialogue.open(LandfillDialogComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getLandfillList();
        }
      },
      error: console.log,
    });
  }
  getLandfillList() {
    this._landfillervice.getLandfillList().subscribe({
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

  deleteLandfill(id: string) {
    this._landfillervice.deleteLandfill(id).subscribe({
      next: (res) => {
        this._snackbar.openSnackBar('landfill deleted successfully', 'done');
        this.getLandfillList();
      },
      error: console.log,
    });
  }
  openEditForm(data: any) {
    const DialogRef = this._dialogue.open(LandfillDialogComponent, {
      data,
    });
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getLandfillList();
        }
      },
      error: console.log,
    });
  }
}
