import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAbonnementComponent } from './gestion-abonnement.component';

describe('GestionAbonnementComponent', () => {
  let component: GestionAbonnementComponent;
  let fixture: ComponentFixture<GestionAbonnementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionAbonnementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAbonnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
