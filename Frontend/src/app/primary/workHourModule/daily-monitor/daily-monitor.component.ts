import { Component } from '@angular/core';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-monitor',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTableModule,
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './daily-monitor.component.html',
  styleUrl: './daily-monitor.component.scss',
})
export class DailyMonitorComponent {
  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    // this.employeeService.getEmployeeDataByDate(selectedDate).subscribe(data => {
    //   this.employeeData = data;
    // });
  }
  displayedColumns: string[] = [
    'name',
    'loginTime',
    'logoutTime',
    'overtimeHours',
    'absencesAndLeaves',
  ];

  employeeData = [
    {
      name: 'John Doe',
      loginTime: new Date(2024, 1, 2, 9, 0),
      logoutTime: new Date(2024, 1, 2, 17, 0),
      overtimeHours: 0,
      absencesAndLeaves: 'None',
    },
    {
      name: 'Jane Smith',
      loginTime: new Date(2024, 1, 1, 8, 30),
      logoutTime: new Date(2024, 1, 1, 17, 30),
      overtimeHours: 1,
      absencesAndLeaves: 'None',
    },
    {
      name: 'Emily Johnson',
      loginTime: new Date(2024, 1, 1, 9, 0),
      logoutTime: new Date(2024, 1, 1, 17, 0),
      overtimeHours: 0,
      absencesAndLeaves: 'Sick leave',
    },
  ];
}
