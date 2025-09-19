import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdileeditComponent } from './prodileedit.component';

describe('ProdileeditComponent', () => {
  let component: ProdileeditComponent;
  let fixture: ComponentFixture<ProdileeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdileeditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdileeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
