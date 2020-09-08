import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpteReleveComponent } from './cpte-releve.component';

describe('CpteReleveComponent', () => {
  let component: CpteReleveComponent;
  let fixture: ComponentFixture<CpteReleveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpteReleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpteReleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
