import { TestBed } from '@angular/core/testing';

import { VehiclesInStsService } from './vehicles-in-sts.service';

describe('VehiclesInStsService', () => {
  let service: VehiclesInStsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiclesInStsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
