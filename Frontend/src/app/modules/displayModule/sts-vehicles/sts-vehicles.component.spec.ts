import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StsVehiclesComponent } from './sts-vehicles.component';

describe('StsVehiclesComponent', () => {
  let component: StsVehiclesComponent;
  let fixture: ComponentFixture<StsVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StsVehiclesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StsVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
