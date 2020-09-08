import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEmpruntComponent } from './view-emprunt.component';

describe('ViewEmpruntComponent', () => {
  let component: ViewEmpruntComponent;
  let fixture: ComponentFixture<ViewEmpruntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewEmpruntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEmpruntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
