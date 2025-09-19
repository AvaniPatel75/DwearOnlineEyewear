import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderRightsideIconComponent } from './header-rightside-icon.component';

describe('HeaderRightsideIconComponent', () => {
  let component: HeaderRightsideIconComponent;
  let fixture: ComponentFixture<HeaderRightsideIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderRightsideIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderRightsideIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
