import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendVehicleComponent } from './send-vehicle.component';

describe('SendVehicleComponent', () => {
  let component: SendVehicleComponent;
  let fixture: ComponentFixture<SendVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendVehicleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SendVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
