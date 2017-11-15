import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheHeaderComponent } from './fiche-header.component';

describe('FicheHeaderComponent', () => {
  let component: FicheHeaderComponent;
  let fixture: ComponentFixture<FicheHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
