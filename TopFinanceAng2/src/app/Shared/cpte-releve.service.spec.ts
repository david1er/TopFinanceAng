import { TestBed } from '@angular/core/testing';

import { CpteReleveService } from './cpte-releve.service';

describe('CpteReleveService', () => {
  let service: CpteReleveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CpteReleveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
