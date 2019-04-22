import { TestBed } from '@angular/core/testing';

import { CreateCarrierService } from './create-carrier.service';

describe('CreateCarrierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreateCarrierService = TestBed.get(CreateCarrierService);
    expect(service).toBeTruthy();
  });
});
