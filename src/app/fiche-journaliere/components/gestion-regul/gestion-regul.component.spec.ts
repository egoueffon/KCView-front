import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRegulComponent } from './gestion-regul.component';

describe('GestionRegulComponent', () => {
  let component: GestionRegulComponent;
  let fixture: ComponentFixture<GestionRegulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionRegulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionRegulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }); 

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
