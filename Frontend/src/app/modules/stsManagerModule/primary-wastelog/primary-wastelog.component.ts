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
import { PrimaryWasteLogService } from '../../../services/primaryWastelog/primary-wastelog.service';
@Component({
  selector: 'app-primary-wastelog',
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
  templateUrl: './primary-wastelog.component.html',
  styleUrl: './primary-wastelog.component.scss',
})
export class PrimaryWasteLogComponent implements OnInit {
  displayedColumns: string[] = [
    'timeAndDateOfCollection',
    'amountOfWasteCollected',
    'contractorID',
    'typeOfWasteCollected',
    'designatedSTSforDeposit',
    'vehicleUsedForTransportation',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private primaryWasteLogService: PrimaryWasteLogService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPrimaryWasteLogs();
  }

  getPrimaryWasteLogs() {
    this.primaryWasteLogService.getPrimaryWasteLogList().subscribe({
      next: (res: any[] | undefined) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
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

  navigateToRegisterPrimaryWasteLog() {
    this.router.navigate(['/primaryWastelogForm']);
  }
}
