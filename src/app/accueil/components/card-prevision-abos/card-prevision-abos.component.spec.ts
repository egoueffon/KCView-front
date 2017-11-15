import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPrevisionAbosComponent } from './card-prevision-abos.component';

describe('CardPrevisionAbosComponent', () => {
  let component: CardPrevisionAbosComponent;
  let fixture: ComponentFixture<CardPrevisionAbosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPrevisionAbosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPrevisionAbosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
