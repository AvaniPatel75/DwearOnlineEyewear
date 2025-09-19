import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderHomePagesComponent } from './header-home-pages.component';

describe('HeaderHomePagesComponent', () => {
  let component: HeaderHomePagesComponent;
  let fixture: ComponentFixture<HeaderHomePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderHomePagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderHomePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
