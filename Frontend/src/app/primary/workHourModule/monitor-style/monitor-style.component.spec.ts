import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorStyleComponent } from './monitor-style.component';

describe('MonitorStyleComponent', () => {
  let component: MonitorStyleComponent;
  let fixture: ComponentFixture<MonitorStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonitorStyleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MonitorStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
