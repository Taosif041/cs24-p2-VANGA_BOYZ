import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterContructorFormComponent } from './register-contructor-form.component';

describe('RegisterContructorFormComponent', () => {
  let component: RegisterContructorFormComponent;
  let fixture: ComponentFixture<RegisterContructorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterContructorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterContructorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
