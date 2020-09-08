import { TestBed } from '@angular/core/testing';

import { OpecourService } from './opecour.service';

describe('OpecourService', () => {
  let service: OpecourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpecourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
