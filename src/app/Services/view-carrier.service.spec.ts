import { TestBed } from '@angular/core/testing';

import { ViewCarrierService } from './view-carrier.service';

describe('ViewCarrierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewCarrierService = TestBed.get(ViewCarrierService);
    expect(service).toBeTruthy();
  });
});
