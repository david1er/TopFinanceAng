import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpecourComponent } from './opecour.component';

describe('OpecourComponent', () => {
  let component: OpecourComponent;
  let fixture: ComponentFixture<OpecourComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpecourComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpecourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
