import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpecoursComponent } from './opecours.component';

describe('OpecoursComponent', () => {
  let component: OpecoursComponent;
  let fixture: ComponentFixture<OpecoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpecoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpecoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
