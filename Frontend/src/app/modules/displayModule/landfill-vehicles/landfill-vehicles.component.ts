import { Component, OnInit } from '@angular/core';
import { WastelogService } from '../../../services/wastelog/wastelog.service';
import { MatCardModule } from '@angular/material/card';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { AuthenticationService } from '../../../services/authentiction/authentiction.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-landfill-vehicles',
  standalone: true,
  imports: [
    MatCardModule,
    NgFor,
    DatePipe,
    MatPaginatorModule,
    MatGridListModule,
    NgClass,
    NgIf,
  ],
  templateUrl: './landfill-vehicles.component.html',
  styleUrl: './landfill-vehicles.component.scss',
})
export class LandfillVehiclesComponent {
  wasteLogs: any[] = [];
  pagedLogs: any[] = [];
  user: any;
  userId: any;
  userInfo: any = [];
  landfill_Id: string = '';

  constructor(
    private wastelogService: WastelogService,
    private authService: AuthenticationService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.getWasteLogs();
    this.getUserData();
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
  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.pagedLogs = this.wasteLogs.slice(startIndex, endIndex);
  }

  getUserData() {
    this.user = this.authService.getUser();
    if (this.user != null) {
      const userId = this.user.id;

      // Call getUserById function with the retrieved user ID
      this.userService.getUserById(userId).subscribe((userData) => {
        // Handle the response here
        this.userInfo = userData;
        this.landfill_Id = this.userInfo.landfill._id;
        console.log('landfill_Id', this.landfill_Id);
      });
    } else {
      console.log('User not found');
    }
  }
  landfillReceiveFunction(logId: string): void {
    this.wastelogService.landfillReceiveFunction(logId).subscribe(
      (response) => {
        // Handle success response if needed
        console.log('Post request successful:', response);
      },
      (error) => {
        // Handle error response if needed
        console.error('Error occurred while making post request:', error);
      }
    );
  }

  departVehicle(logId: string): void {
    this.wastelogService.departVehicle(logId).subscribe(
      (response) => {
        console.log('Vehicle departed successfully:', response);
        // Handle success response here
      },
      (error) => {
        console.error('Error departing vehicle:', error);
        // Handle error response here
      }
    );
  }
}
