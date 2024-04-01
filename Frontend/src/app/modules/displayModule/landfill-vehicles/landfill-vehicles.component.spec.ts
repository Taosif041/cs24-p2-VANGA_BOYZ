import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandfillVehiclesComponent } from './landfill-vehicles.component';

describe('LandfillVehiclesComponent', () => {
  let component: LandfillVehiclesComponent;
  let fixture: ComponentFixture<LandfillVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandfillVehiclesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandfillVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
