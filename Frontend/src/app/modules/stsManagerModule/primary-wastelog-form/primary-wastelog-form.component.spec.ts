import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryWastelogFormComponent } from './primary-wastelog-form.component';

describe('PrimaryWastelogFormComponent', () => {
  let component: PrimaryWastelogFormComponent;
  let fixture: ComponentFixture<PrimaryWastelogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryWastelogFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrimaryWastelogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
