import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceedTpOrderComponent } from './proceed-tp-order.component';

describe('ProceedTpOrderComponent', () => {
  let component: ProceedTpOrderComponent;
  let fixture: ComponentFixture<ProceedTpOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceedTpOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProceedTpOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
