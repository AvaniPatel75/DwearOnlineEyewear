import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourCartServiceComponent } from './your-cart-service.component';

describe('YourCartServiceComponent', () => {
  let component: YourCartServiceComponent;
  let fixture: ComponentFixture<YourCartServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourCartServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YourCartServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
