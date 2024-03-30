import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandfillComponent } from './landfill.component';

describe('LandfillComponent', () => {
  let component: LandfillComponent;
  let fixture: ComponentFixture<LandfillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandfillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
