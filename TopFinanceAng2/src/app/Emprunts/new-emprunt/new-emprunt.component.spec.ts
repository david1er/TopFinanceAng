import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmpruntComponent } from './new-emprunt.component';

describe('NewEmpruntComponent', () => {
  let component: NewEmpruntComponent;
  let fixture: ComponentFixture<NewEmpruntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEmpruntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
