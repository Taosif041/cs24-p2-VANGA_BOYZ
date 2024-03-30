import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandfillDialogComponent } from './landfill-dialog.component';

describe('LandfillDialogComponent', () => {
  let component: LandfillDialogComponent;
  let fixture: ComponentFixture<LandfillDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandfillDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandfillDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
