import { TestBed } from '@angular/core/testing';

import { DirectCostService } from './direct-cost.service';

describe('DirectCostService', () => {
  let service: DirectCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
