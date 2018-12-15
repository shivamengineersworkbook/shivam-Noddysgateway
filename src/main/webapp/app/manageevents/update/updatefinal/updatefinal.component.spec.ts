import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatefinalComponent } from './updatefinal.component';

describe('UpdatefinalComponent', () => {
  let component: UpdatefinalComponent;
  let fixture: ComponentFixture<UpdatefinalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatefinalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatefinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
