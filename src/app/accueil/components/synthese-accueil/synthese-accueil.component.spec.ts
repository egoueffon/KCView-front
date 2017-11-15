import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyntheseAccueilComponent } from './synthese-accueil.component';

describe('SyntheseAccueilComponent', () => {
  let component: SyntheseAccueilComponent;
  let fixture: ComponentFixture<SyntheseAccueilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyntheseAccueilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyntheseAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
