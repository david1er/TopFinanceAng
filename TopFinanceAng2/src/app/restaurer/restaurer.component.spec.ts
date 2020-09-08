import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurerComponent } from './restaurer.component';

describe('RestaurerComponent', () => {
  let component: RestaurerComponent;
  let fixture: ComponentFixture<RestaurerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
