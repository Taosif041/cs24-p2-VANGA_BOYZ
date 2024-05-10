import { TestBed } from '@angular/core/testing';

import { PrimaryWastelogService } from './primary-wastelog.service';

describe('PrimaryWastelogService', () => {
  let service: PrimaryWastelogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimaryWastelogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
