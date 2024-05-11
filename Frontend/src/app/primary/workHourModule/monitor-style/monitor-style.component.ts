import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitor-style',
  standalone: true,
  imports: [],
  templateUrl: './monitor-style.component.html',
  styleUrl: './monitor-style.component.scss',
})
export class MonitorStyleComponent {
  constructor(private router: Router) {}
  navigateToDailyMonitor() {
    this.router.navigate(['/daily-monitor']);
  }
  navigateToMonthlyMonitor() {
    this.router.navigate(['/monthly-monitor']);
  }
}
