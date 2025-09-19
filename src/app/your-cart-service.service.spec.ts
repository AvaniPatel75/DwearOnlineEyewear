import { TestBed } from '@angular/core/testing';

import { YourCartServiceService } from './your-cart-service.service';

describe('YourCartServiceService', () => {
  let service: YourCartServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YourCartServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
