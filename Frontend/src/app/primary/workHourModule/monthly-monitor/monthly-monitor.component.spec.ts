import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyMonitorComponent } from './monthly-monitor.component';

describe('MonthlyMonitorComponent', () => {
  let component: MonthlyMonitorComponent;
  let fixture: ComponentFixture<MonthlyMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyMonitorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonthlyMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
