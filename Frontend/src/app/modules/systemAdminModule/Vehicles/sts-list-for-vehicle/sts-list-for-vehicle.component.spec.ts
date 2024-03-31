import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StsListForVehicleComponent } from './sts-list-for-vehicle.component';

describe('StsListForVehicleComponent', () => {
  let component: StsListForVehicleComponent;
  let fixture: ComponentFixture<StsListForVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StsListForVehicleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StsListForVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
