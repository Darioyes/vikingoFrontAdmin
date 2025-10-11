import { TestBed } from '@angular/core/testing';

import { PurcharseOrdersService } from './purcharse-orders.service';

describe('PurcharseOrdersService', () => {
  let service: PurcharseOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurcharseOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
