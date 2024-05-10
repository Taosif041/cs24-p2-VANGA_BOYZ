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

import { MatMenuModule } from '@angular/material/menu';
import { SnackbarService } from '../../../services/snackbar/snackbar.service';
import { RegisterContructorDialogComponent } from '../register-contructor-dialog/register-contructor-dialog.component';
import { ContructorService } from '../../../services/contructor/contructor.service';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-register-contructor',
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
    RouterOutlet,
  ],
  templateUrl: './register-contructor.component.html',
  styleUrl: './register-contructor.component.scss',
})
export class RegisterContructorComponent implements OnInit {
  displayedColumns: string[] = [
    'companyName',
    'registrationId',
    'tin',
    'contactNumber',
    'workforceSize',
    'paymentPerTonnage',
    'requiredAmountPerDay',
    'contractDuration',
    'designatedSTS',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialogue: MatDialog,
    private _Contructorervice: ContructorService,
    private _snackbar: SnackbarService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getContructorList();
  }

  openDilogForm() {
    const DialogRef = this._dialogue.open(RegisterContructorDialogComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContructorList();
        }
      },
      error: console.log,
    });
  }
  getContructorList() {
    this._Contructorervice.getContructorList().subscribe({
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

  deleteContructor(id: string) {
    this._Contructorervice.deleteContructor(id).subscribe({
      next: (res) => {
        this._snackbar.openSnackBar('Contructor deleted successfully', 'done');
        this.getContructorList();
      },
      error: console.log,
    });
  }
  openEditForm(data: any) {
    const DialogRef = this._dialogue.open(RegisterContructorDialogComponent, {
      data,
    });
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getContructorList();
        }
      },
      error: console.log,
    });
  }
  navigateToRegisterConstructorForm() {
    this.router.navigate(['/register-contructor-form']);
  }
}
