import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCompteComponent } from './new-compte.component';

describe('NewCompteComponent', () => {
  let component: NewCompteComponent;
  let fixture: ComponentFixture<NewCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
