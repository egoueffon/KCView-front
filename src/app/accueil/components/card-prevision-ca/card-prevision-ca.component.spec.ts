import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPrevisionCAComponent } from './card-prevision-ca.component';

describe('CardPrevisionCAComponent', () => {
  let component: CardPrevisionCAComponent;
  let fixture: ComponentFixture<CardPrevisionCAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPrevisionCAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPrevisionCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
