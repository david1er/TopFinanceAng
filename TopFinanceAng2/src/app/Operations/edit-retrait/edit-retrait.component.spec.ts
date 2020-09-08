import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRetraitComponent } from './edit-retrait.component';

describe('EditRetraitComponent', () => {
  let component: EditRetraitComponent;
  let fixture: ComponentFixture<EditRetraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRetraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
