import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSTSComponent } from './add-sts.component';

describe('AddSTSComponent', () => {
  let component: AddSTSComponent;
  let fixture: ComponentFixture<AddSTSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSTSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSTSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
