import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleveCompteComponent } from './releve-compte.component';

describe('ReleveCompteComponent', () => {
  let component: ReleveCompteComponent;
  let fixture: ComponentFixture<ReleveCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleveCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleveCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
