import { TestBed } from '@angular/core/testing';

import { SupliersServiceService } from './supliers-service.service';

describe('SupliersServiceService', () => {
  let service: SupliersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupliersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
