import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStsDialogComponent } from './add-sts-dialog.component';

describe('AddStsDialogComponent', () => {
  let component: AddStsDialogComponent;
  let fixture: ComponentFixture<AddStsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
