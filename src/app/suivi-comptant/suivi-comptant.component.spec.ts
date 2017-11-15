import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviComptantComponent } from './suivi-comptant.component';

describe('SuiviComptantComponent', () => {
  let component: SuiviComptantComponent;
  let fixture: ComponentFixture<SuiviComptantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviComptantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviComptantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
