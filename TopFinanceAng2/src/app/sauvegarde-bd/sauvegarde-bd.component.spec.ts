import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SauvegardeBDComponent } from './sauvegarde-bd.component';

describe('SauvegardeBDComponent', () => {
  let component: SauvegardeBDComponent;
  let fixture: ComponentFixture<SauvegardeBDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SauvegardeBDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SauvegardeBDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
