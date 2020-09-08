import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompteComponent } from './view-compte.component';

describe('ViewCompteComponent', () => {
  let component: ViewCompteComponent;
  let fixture: ComponentFixture<ViewCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
