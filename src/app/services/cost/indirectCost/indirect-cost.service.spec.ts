import { TestBed } from '@angular/core/testing';

import { IndirectCostService } from './indirect-cost.service';

describe('IndirectCostService', () => {
  let service: IndirectCostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndirectCostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
