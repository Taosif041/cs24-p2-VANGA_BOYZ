import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveVehicleComponent } from './receive-vehicle.component';

describe('ReceiveVehicleComponent', () => {
  let component: ReceiveVehicleComponent;
  let fixture: ComponentFixture<ReceiveVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiveVehicleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReceiveVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
