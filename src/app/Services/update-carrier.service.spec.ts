import { TestBed } from '@angular/core/testing';

import { UpdateCarrierService } from './update-carrier.service';

describe('UpdateCarrierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateCarrierService = TestBed.get(UpdateCarrierService);
    expect(service).toBeTruthy();
  });
});
