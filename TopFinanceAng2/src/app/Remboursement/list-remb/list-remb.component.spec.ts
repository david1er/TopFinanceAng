import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRembComponent } from './list-remb.component';

describe('ListRembComponent', () => {
  let component: ListRembComponent;
  let fixture: ComponentFixture<ListRembComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRembComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRembComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
