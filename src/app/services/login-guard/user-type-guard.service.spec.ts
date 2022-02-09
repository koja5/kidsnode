import { TestBed } from '@angular/core/testing';

import { UserTypeGuardService } from './user-type-guard.service';

describe('UserTypeGuardService', () => {
  let service: UserTypeGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTypeGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
