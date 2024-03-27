import { VehicleService } from './../../../../services/vehicle/vehicle.service';
import { VehicleDialogComponent } from './../vehicle-dialog/vehicle-dialog.component';
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

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    VehicleDialogComponent,
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
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
})
export class VehiclesComponent implements OnInit {
  displayedColumns: string[] = [
    'registrationNumber',
    'type',
    'capacity',
    'fuelCostFullyLoaded',
    'fuelCostUnloaded',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialogue: MatDialog,
    private _vehicleService: VehicleService,
    private _snackbar: SnackbarService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getVehiclesList();
  }

  openDilogForm() {
    const DialogRef = this._dialogue.open(VehicleDialogComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVehiclesList();
        }
      },
      error: console.log,
    });
  }
  getVehiclesList() {
    this._vehicleService.getVehiclesList().subscribe({
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

  deleteVehicles(id: string) {
    this._vehicleService.deleteVehicles(id).subscribe({
      next: (res) => {
        this._snackbar.openSnackBar('Vehicle deleted successfully', 'done');
        this.getVehiclesList();
      },
      error: console.log,
    });
  }
  openEditForm(data: any) {
    const DialogRef = this._dialogue.open(VehicleDialogComponent, {
      data,
    });
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVehiclesList();
        }
      },
      error: console.log,
    });
  }
}
