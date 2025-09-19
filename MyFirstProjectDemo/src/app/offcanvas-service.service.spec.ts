import { TestBed } from '@angular/core/testing';

import { OffcanvasServiceService } from './offcanvas-service.service';

describe('OffcanvasServiceService', () => {
  let service: OffcanvasServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffcanvasServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
