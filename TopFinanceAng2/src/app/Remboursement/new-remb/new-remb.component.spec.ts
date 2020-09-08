import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRembComponent } from './new-remb.component';

describe('NewRembComponent', () => {
  let component: NewRembComponent;
  let fixture: ComponentFixture<NewRembComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRembComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRembComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
