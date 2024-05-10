import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryWastelogComponent } from './primary-wastelog.component';

describe('PrimaryWastelogComponent', () => {
  let component: PrimaryWastelogComponent;
  let fixture: ComponentFixture<PrimaryWastelogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimaryWastelogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrimaryWastelogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
