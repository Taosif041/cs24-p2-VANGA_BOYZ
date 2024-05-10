import { Component, OnInit } from '@angular/core';
import { WastelogService } from '../../../services/wastelog/wastelog.service';
import { MatCardModule } from '@angular/material/card';
import { NgClass, NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-wastelogs',
  standalone: true,
  imports: [
    MatCardModule,
    NgFor,
    DatePipe,
    MatPaginatorModule,
    MatGridListModule,
    NgClass,
    NgxPaginationModule,
  ],
  templateUrl: './wastelogs.component.html',
  styleUrl: './wastelogs.component.scss',
})
export class WastelogsComponent implements OnInit {
  constructor(private wastelogService: WastelogService) {}
  wasteLogs: any[] = [];
  pagedLogs: any[] = [];

  ngOnInit() {
    this.getWasteLogs();
  }

  getWasteLogs(): void {
    this.wastelogService.getWasteLogs().subscribe(
      (logs) => {
        // Handle the waste logs data
        console.log(logs);
        this.wasteLogs = logs;
        this.pagedLogs = this.wasteLogs.slice(0, 6);
      },
      (error) => {
        // Handle error
        console.error('Error fetching waste logs:', error);
      }
    );
  }
  p: any;
  pageSize = 4;
  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedLogs = this.wasteLogs.slice(startIndex, endIndex);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'inSts':
        return 'in-sts';
      case 'goingToLandfill':
        return 'going-to-landfill';
      case 'inLandfill':
        return 'in-landfill';
      case 'returningToSts':
        return 'returning-to-sts';
      default:
        return '';
    }
  }

  formatOilConsumed(value: number): string {
    return value.toFixed(2); // Rounds to 2 decimal places
  }
}
