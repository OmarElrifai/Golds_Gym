import { TestBed } from '@angular/core/testing';

import { DateFormaterService } from './date-formater.service';

describe('DateFormaterService', () => {
  let service: DateFormaterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateFormaterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
