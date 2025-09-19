import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandSideBarComponent } from './brand-side-bar.component';

describe('BrandSideBarComponent', () => {
  let component: BrandSideBarComponent;
  let fixture: ComponentFixture<BrandSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandSideBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrandSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
