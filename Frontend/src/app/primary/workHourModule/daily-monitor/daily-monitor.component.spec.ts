import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyMonitorComponent } from './daily-monitor.component';

describe('DailyMonitorComponent', () => {
  let component: DailyMonitorComponent;
  let fixture: ComponentFixture<DailyMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyMonitorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
