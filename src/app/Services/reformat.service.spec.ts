import { TestBed } from '@angular/core/testing';

import { ReformatService } from './reformat.service';

describe('ReformatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReformatService = TestBed.get(ReformatService);
    expect(service).toBeTruthy();
  });
});
