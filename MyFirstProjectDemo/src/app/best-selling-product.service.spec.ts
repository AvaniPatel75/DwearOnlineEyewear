import { TestBed } from '@angular/core/testing';

import { BestSellingProductService } from './best-selling-product.service';

describe('BestSellingProductService', () => {
  let service: BestSellingProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestSellingProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
