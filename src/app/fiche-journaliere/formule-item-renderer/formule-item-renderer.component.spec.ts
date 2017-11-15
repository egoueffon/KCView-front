import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormuleItemRendererComponent } from './formule-item-renderer.component';

describe('FormuleItemRendererComponent', () => {
  let component: FormuleItemRendererComponent;
  let fixture: ComponentFixture<FormuleItemRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormuleItemRendererComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormuleItemRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
