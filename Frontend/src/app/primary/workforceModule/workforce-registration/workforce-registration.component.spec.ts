import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkforceRegistrationComponent } from './workforce-registration.component';

describe('WorkforceRegistrationComponent', () => {
  let component: WorkforceRegistrationComponent;
  let fixture: ComponentFixture<WorkforceRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkforceRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkforceRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
