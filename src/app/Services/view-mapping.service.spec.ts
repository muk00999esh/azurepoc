import { TestBed } from '@angular/core/testing';

import { ViewMappingService } from './view-mapping.service';

describe('ViewMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewMappingService = TestBed.get(ViewMappingService);
    expect(service).toBeTruthy();
  });
});
