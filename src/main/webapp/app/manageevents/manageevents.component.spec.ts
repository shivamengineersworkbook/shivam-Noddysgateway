import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageeventsComponent } from './manageevents.component';

describe('ManageeventsComponent', () => {
  let component: ManageeventsComponent;
  let fixture: ComponentFixture<ManageeventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageeventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageeventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
