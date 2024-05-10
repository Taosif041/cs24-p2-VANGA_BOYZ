import { Component, OnInit, ViewChild } from '@angular/core';
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
import { RouterOutlet, Router } from '@angular/router';
import { WorkforceService } from '../../../services/workforce/workforce.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-workforce-registration',
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
    MatDatepickerModule,
  ],
  templateUrl: './workforce-registration.component.html',
  styleUrl: './workforce-registration.component.scss',
})
export class WorkforceRegistrationComponent implements OnInit {
  displayedColumns: string[] = [
    'fullName',
    'dateOfBirth',
    'dateOfHire',
    'jobTitle',
    'paymentRatePerHour',
    'contactInformation',
    'assignedCollectionRoute',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _WorkforceService: WorkforceService,
    private _snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getWorkforceList();
  }

  getWorkforceList() {
    this._WorkforceService.getWorkforceList().subscribe({
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

  deleteWorkforce(id: string) {
    this._WorkforceService.deleteWorkforce(id).subscribe({
      next: (res) => {
        this._snackbar.openSnackBar('Workforce deleted successfully', 'done');
        this.getWorkforceList();
      },
      error: console.log,
    });
  }

  navigateToRegisterWorkforceForm() {
    this.router.navigate(['/register-workforce-form']);
  }
}
