import { TestBed } from '@angular/core/testing';

import { AdminLeaveService } from './admin-leave.service';

describe('AdminLeaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminLeaveService = TestBed.get(AdminLeaveService);
    expect(service).toBeTruthy();
  });
});
