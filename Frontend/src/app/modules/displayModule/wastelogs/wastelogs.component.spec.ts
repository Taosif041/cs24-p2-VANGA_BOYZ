import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WastelogsComponent } from './wastelogs.component';

describe('WastelogsComponent', () => {
  let component: WastelogsComponent;
  let fixture: ComponentFixture<WastelogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WastelogsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WastelogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
