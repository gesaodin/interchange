import { TestBed } from '@angular/core/testing';

import { FlyService } from './fly.service';

describe('FlyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlyService = TestBed.get(FlyService);
    expect(service).toBeTruthy();
  });
});
