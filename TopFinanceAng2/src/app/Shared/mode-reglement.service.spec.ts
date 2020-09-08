import { TestBed } from '@angular/core/testing';

import { ModeReglementService } from './mode-reglement.service';

describe('ModeReglementService', () => {
  let service: ModeReglementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeReglementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
