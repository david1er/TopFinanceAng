import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeReglementComponent } from './mode-reglement.component';

describe('ModeReglementComponent', () => {
  let component: ModeReglementComponent;
  let fixture: ComponentFixture<ModeReglementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeReglementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
