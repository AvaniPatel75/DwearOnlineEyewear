import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderWishlistComponent } from './header-wishlist.component';

describe('HeaderWishlistComponent', () => {
  let component: HeaderWishlistComponent;
  let fixture: ComponentFixture<HeaderWishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderWishlistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
