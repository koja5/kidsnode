import { TestBed } from '@angular/core/testing';

import { RecordsOfArrivalsService } from './records-of-arrivals.service';

describe('RecordsOfArrivalsService', () => {
  let service: RecordsOfArrivalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecordsOfArrivalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
