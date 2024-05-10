import { TestBed } from '@angular/core/testing';

import { ContructorService } from './contructor.service';

describe('ContructorService', () => {
  let service: ContructorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContructorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
