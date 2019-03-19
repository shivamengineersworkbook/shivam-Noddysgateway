import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterExtraComponent } from './footer-extra.component';

describe('FooterExtraComponent', () => {
  let component: FooterExtraComponent;
  let fixture: ComponentFixture<FooterExtraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterExtraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
