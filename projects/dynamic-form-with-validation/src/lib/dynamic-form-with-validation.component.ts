import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

// Interfaces
export interface IFormField {
  name: string;
  type: string;
  validators: IFormValidation;
  label: string;
  value: string;
}

export interface IFormValidation {
  required?: boolean;
  pattern?: RegExp | string;
  email?: boolean;
}

export interface IErrorMessage {
  required: string;
  invalid: string;
}

@Component({
  selector: "dynamic-form",
  template: `
    <div class="form-container">
      <form (ngSubmit)="onSubmit()" [formGroup]="formGroup">
        <div *ngFor="let field of fieldList" class="field-container">
          <label [attr.for]="field.name">{{ field.label }}</label>
          <input
            class="input-field"
            [ngClass]="{ error: isTouched(field.name) && !isValid(field.name) }"
            [formControlName]="field.name"
            [type]="field.type"
          />
          <div
            class="error-message"
            *ngIf="isTouched(field.name) && !isValid(field.name)"
          >
            <div *ngIf="formGroup.controls[field.name].errors.required">
              {{ errorMessages.required }}
            </div>
            <div
              *ngIf="
                formGroup.controls[field.name].errors.email ||
                formGroup.controls[field.name].errors.pattern
              "
            >
              {{ errorMessages.invalid }}
            </div>
          </div>
        </div>
        <div class="btn-container">
          <button type="submit" [disabled]="!formGroup.valid">
            {{ buttonLabel }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      .form-container {
        background: linear-gradient(
          to right bottom,
          rgba(255, 255, 255, 0.8),
          rgba(255, 255, 255, 0.3)
        );
        border-radius: 0.5rem;
        z-index: 2;
        backdrop-filter: blur(2rem);
        display: flex;
        justify-content: space-between;
        padding: 2rem;
        width: 30rem;
        box-shadow: 6px 6px 20px rgba(122, 122, 122, 0.212);
      }
      .form-container form {
        width: 100%;
        padding: 0rem 0 2.3rem 1rem;
      }
      .form-container form label {
        font-size: 1.2rem;
        margin-bottom: 0.2rem;
      }
      .form-container form .field-container {
        width: 100%;
        margin-bottom: 1rem;
      }
      .form-container form .field-container .input-field {
        display: block;
        width: 97%;
        border-radius: 0.5rem;
        height: 3rem;
        margin: 0.3rem 0;
        font-size: 1.1rem;
        padding-left: 0.5rem;
        border: 1px solid #d7d7d7;
        outline: none;
      }
      .form-container form .field-container .error {
        border: 1px solid #f00;
      }
      .form-container form .field-container .error-message {
        color: #f00;
      }
      .form-container form .btn-container {
        display: flex;
        justify-content: flex-end;
        height: 2rem;
      }
      .form-container form .btn-container button {
        color: #fff;
        text-align: center;
        border: none;
        border-radius: 0.5rem;
        min-width: 10rem;
        height: 3rem;
        font-size: 1.2rem;
        margin-top: 1rem;
      }
      .form-container form .btn-container button {
        background: linear-gradient(to right top, #000000e8, #00000061);
        outline: none;
        cursor: pointer;
      }
      .form-container form .btn-container button[disabled] {
        background: #b4b4b4;
        cursor: not-allowed;
      }
      @media screen and (max-width: "625px"), (max-width: "425px") {
        .form-container {
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 15rem;
        }
        .form-container h1 {
          margin: 0 0 2rem 0;
        }
        .form-container form {
          width: 100%;
        }
        .form-container button {
          width: 100%;
        }
      }
    `
  ]
})
export class DynamicFormWithValidationComponent {
  @Input() fieldList: Array<IFormField>;
  @Input() buttonLabel?: string = "Submit";
  @Input() errorMessages?: IErrorMessage = {
    required: "This is a required field.",
    invalid: "Please provide valid details."
  };
  @Output() formSubmit = new EventEmitter<any>();
  public formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
    this.formGroup = this.buildFormGroup();
  }

  buildFormGroup() {
    const group = {};
    let validatorList = [];
    this.fieldList?.forEach(field => {
      if (field.validators.required) {
        validatorList.push(Validators.required);
      }
      if (field.validators.email) {
        validatorList.push(Validators.email);
      }
      if (field.validators.pattern) {
        validatorList.push(Validators.pattern(field.validators.pattern));
      }
      group[field.name] = new FormControl(field.value || "", validatorList);
      validatorList = [];
    });
    return new FormGroup(group);
  }

  isValid(fieldName) {
    return this.formGroup.controls[fieldName].valid;
  }

  isTouched(fieldName) {
    return this.formGroup.controls[fieldName].touched;
  }

  onSubmit() {
    const updatedFormData = {};
    this.fieldList.forEach(field => {
      updatedFormData[field.name] = this.formGroup.controls[field.name].value;
    });
    this.formSubmit.emit(updatedFormData);
  }
}
