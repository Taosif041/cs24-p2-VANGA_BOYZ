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
import { ContructorService } from '../../../services/contructor/contructor.service';
import { RouterOutlet, Router } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { StsService } from '../../../services/sts/sts.service';

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
    MatDatepickerModule,
  ],
  templateUrl: './register-contructor.component.html',
  styleUrl: './register-contructor.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class RegisterContructorComponent implements OnInit {
  displayedColumns: string[] = [
    'companyName',
    'contactNumber',
    'workforceSize',
    'paymentPerTonnageOfWaste',
    'requiredAmountOfWastePerDay',
    'contractDuration',
    // 'designatedSTS',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialogue: MatDialog,
    private _Contructorervice: ContructorService,
    private _snackbar: SnackbarService,
    private _stsService: StsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getContructorList();
  }

  getContructorList() {
    this._Contructorervice.getContructorList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log('contructor list', res);
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

  navigateToRegisterConstructorForm() {
    this.router.navigate(['/register-contructor-form']);
  }

  getStsById(id: string) {
    this._stsService.getStsById(id).subscribe({
      next: (sts: any) => {
        console.log('STS:', sts);
        return sts.name;
        // Do something with the fetched STS data
      },
      error: (error) => {
        console.error('Error fetching STS by ID:', error);
      },
    });
  }
}
