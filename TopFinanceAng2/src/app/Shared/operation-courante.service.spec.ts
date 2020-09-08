import { TestBed } from '@angular/core/testing';

import { OperationCouranteService } from './operation-courante.service';

describe('OperationCouranteService', () => {
  let service: OperationCouranteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationCouranteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
