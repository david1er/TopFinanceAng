import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpecourListComponent } from './opecour-list.component';

describe('OpecourListComponent', () => {
  let component: OpecourListComponent;
  let fixture: ComponentFixture<OpecourListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpecourListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpecourListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
