import { TestBed } from '@angular/core/testing';

import { MaintenanceProgressService } from './maintenance-progress.service';

describe('MaintenanceProgressService', () => {
  let service: MaintenanceProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenanceProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
