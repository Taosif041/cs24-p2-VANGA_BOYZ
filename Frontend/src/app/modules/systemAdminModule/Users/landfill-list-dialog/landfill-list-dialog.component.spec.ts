import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandfillListDialogComponent } from './landfill-list-dialog.component';

describe('LandfillListDialogComponent', () => {
  let component: LandfillListDialogComponent;
  let fixture: ComponentFixture<LandfillListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandfillListDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandfillListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
