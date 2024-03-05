import { TestBed } from '@angular/core/testing';

import { PayslipsService } from './payslips.service';

describe('PayslipsService', () => {
  let service: PayslipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayslipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
