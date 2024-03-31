import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTransferComponent } from './vehicle-transfer.component';

describe('VehicleTransferComponent', () => {
  let component: VehicleTransferComponent;
  let fixture: ComponentFixture<VehicleTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
