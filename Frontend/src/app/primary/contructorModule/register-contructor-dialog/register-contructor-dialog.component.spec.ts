import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterContructorDialogComponent } from './register-contructor-dialog.component';

describe('RegisterContructorDialogComponent', () => {
  let component: RegisterContructorDialogComponent;
  let fixture: ComponentFixture<RegisterContructorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterContructorDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterContructorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
