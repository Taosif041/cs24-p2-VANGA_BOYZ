import { TestBed } from '@angular/core/testing';

import { WastelogService } from './wastelog.service';

describe('WastelogService', () => {
  let service: WastelogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WastelogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
