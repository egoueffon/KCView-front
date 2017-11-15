import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheJournaliereComponent } from './fiche-journaliere.component';

describe('FicheJournaliereComponent', () => {
  let component: FicheJournaliereComponent;
  let fixture: ComponentFixture<FicheJournaliereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheJournaliereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheJournaliereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
