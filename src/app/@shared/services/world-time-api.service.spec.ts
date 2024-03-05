import { TestBed } from '@angular/core/testing';

import { WorldTimeAPIService } from './world-time-api.service';

describe('WorldTimeAPIService', () => {
  let service: WorldTimeAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldTimeAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
