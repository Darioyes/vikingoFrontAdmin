import { TestBed } from '@angular/core/testing';

import { SalesMainService } from './sales-main.service';

describe('SalesMainService', () => {
  let service: SalesMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
