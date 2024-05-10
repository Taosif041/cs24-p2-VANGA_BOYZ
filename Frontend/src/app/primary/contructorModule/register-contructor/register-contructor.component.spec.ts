import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterContructorComponent } from './register-contructor.component';

describe('RegisterContructorComponent', () => {
  let component: RegisterContructorComponent;
  let fixture: ComponentFixture<RegisterContructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterContructorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterContructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
