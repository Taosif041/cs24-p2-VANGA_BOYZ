import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StsListDialogComponent } from './sts-list-dialog.component';

describe('StsListDialogComponent', () => {
  let component: StsListDialogComponent;
  let fixture: ComponentFixture<StsListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StsListDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StsListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
