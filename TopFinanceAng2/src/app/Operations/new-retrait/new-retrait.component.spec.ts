import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRetraitComponent } from './new-retrait.component';

describe('NewRetraitComponent', () => {
  let component: NewRetraitComponent;
  let fixture: ComponentFixture<NewRetraitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewRetraitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
