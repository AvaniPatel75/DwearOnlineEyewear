import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnisexComponent } from './unisex.component';

describe('UnisexComponent', () => {
  let component: UnisexComponent;
  let fixture: ComponentFixture<UnisexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnisexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnisexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
