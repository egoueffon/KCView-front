import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulePickerComponent } from './formule-picker.component';

describe('FormulePickerComponent', () => {
  let component: FormulePickerComponent;
  let fixture: ComponentFixture<FormulePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
