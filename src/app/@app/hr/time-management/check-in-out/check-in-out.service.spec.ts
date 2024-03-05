import { TestBed } from '@angular/core/testing';

import { CheckInOutService } from './check-in-out.service';

describe('CheckInOutService', () => {
  let service: CheckInOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckInOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
