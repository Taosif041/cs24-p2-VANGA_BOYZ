import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkforceRegistrationFormComponent } from './workforce-registration-form.component';

describe('WorkforceRegistrationFormComponent', () => {
  let component: WorkforceRegistrationFormComponent;
  let fixture: ComponentFixture<WorkforceRegistrationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkforceRegistrationFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkforceRegistrationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
