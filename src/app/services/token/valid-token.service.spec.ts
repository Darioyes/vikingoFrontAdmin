import { TestBed } from '@angular/core/testing';

import { ValidTokenService } from './valid-token.service';

describe('ValidTokenService', () => {
  let service: ValidTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
