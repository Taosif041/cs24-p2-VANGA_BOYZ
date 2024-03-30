import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvideOTPComponent } from './provide-otp.component';

describe('ProvideOTPComponent', () => {
  let component: ProvideOTPComponent;
  let fixture: ComponentFixture<ProvideOTPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvideOTPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProvideOTPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
