import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTransferDataComponent } from './vehicle-transfer-data.component';

describe('VehicleTransferDataComponent', () => {
  let component: VehicleTransferDataComponent;
  let fixture: ComponentFixture<VehicleTransferDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTransferDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleTransferDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
