import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurerBDComponent } from './restaurer-bd.component';

describe('RestaurerBDComponent', () => {
  let component: RestaurerBDComponent;
  let fixture: ComponentFixture<RestaurerBDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurerBDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurerBDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
