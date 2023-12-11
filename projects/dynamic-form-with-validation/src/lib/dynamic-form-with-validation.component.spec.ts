import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormWithValidationComponent } from './dynamic-form-with-validation.component';

describe('DynamicFormWithValidationComponent', () => {
  let component: DynamicFormWithValidationComponent;
  let fixture: ComponentFixture<DynamicFormWithValidationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormWithValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormWithValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
