import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KcLinkComponent } from './kc-link.component';

describe('KcLinkComponent', () => {
  let component: KcLinkComponent;
  let fixture: ComponentFixture<KcLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KcLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KcLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
