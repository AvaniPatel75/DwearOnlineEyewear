import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeDetailComponent } from './shape-detail.component';

describe('ShapeDetailComponent', () => {
  let component: ShapeDetailComponent;
  let fixture: ComponentFixture<ShapeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShapeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShapeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
