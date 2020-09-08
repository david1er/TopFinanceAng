import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCouranteComponent } from './operation-courante.component';

describe('OperationCouranteComponent', () => {
  let component: OperationCouranteComponent;
  let fixture: ComponentFixture<OperationCouranteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationCouranteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationCouranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
