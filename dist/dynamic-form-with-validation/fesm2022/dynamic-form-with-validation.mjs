import * as i0 from '@angular/core';
import { EventEmitter, Component, Input, Output, NgModule } from '@angular/core';
import * as i2 from '@angular/forms';
import { Validators, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import * as i1 from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

class DynamicFormWithValidationComponent {
    constructor() {
        this.buttonLabel = "Submit";
        this.errorMessages = {
            required: "This is a required field.",
            invalid: "Please provide valid details."
        };
        this.formSubmit = new EventEmitter();
    }
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicFormWithValidationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: DynamicFormWithValidationComponent, selector: "dynamic-form", inputs: { fieldList: "fieldList", buttonLabel: "buttonLabel", errorMessages: "errorMessages" }, outputs: { formSubmit: "formSubmit" }, ngImport: i0, template: `
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
  `, isInline: true, styles: [".form-container{background:linear-gradient(to right bottom,#fffc,#ffffff4d);border-radius:.5rem;z-index:2;-webkit-backdrop-filter:blur(2rem);backdrop-filter:blur(2rem);display:flex;justify-content:space-between;padding:2rem;width:30rem;box-shadow:6px 6px 20px #7a7a7a36}.form-container form{width:100%;padding:0rem 0 2.3rem 1rem}.form-container form label{font-size:1.2rem;margin-bottom:.2rem}.form-container form .field-container{width:100%;margin-bottom:1rem}.form-container form .field-container .input-field{display:block;width:97%;border-radius:.5rem;height:3rem;margin:.3rem 0;font-size:1.1rem;padding-left:.5rem;border:1px solid #d7d7d7;outline:none}.form-container form .field-container .error{border:1px solid #f00}.form-container form .field-container .error-message{color:red}.form-container form .btn-container{display:flex;justify-content:flex-end;height:2rem}.form-container form .btn-container button{color:#fff;text-align:center;border:none;border-radius:.5rem;min-width:10rem;height:3rem;font-size:1.2rem;margin-top:1rem}.form-container form .btn-container button{background:linear-gradient(to right top,#000000e8,#00000061);outline:none;cursor:pointer}.form-container form .btn-container button[disabled]{background:#b4b4b4;cursor:not-allowed}@media screen and (max-width: \"625px\"),(max-width: \"425px\"){.form-container{flex-direction:column;justify-content:center;align-items:center;width:15rem}.form-container h1{margin:0 0 2rem}.form-container form,.form-container button{width:100%}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicFormWithValidationComponent, decorators: [{
            type: Component,
            args: [{ selector: "dynamic-form", template: `
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
  `, styles: [".form-container{background:linear-gradient(to right bottom,#fffc,#ffffff4d);border-radius:.5rem;z-index:2;-webkit-backdrop-filter:blur(2rem);backdrop-filter:blur(2rem);display:flex;justify-content:space-between;padding:2rem;width:30rem;box-shadow:6px 6px 20px #7a7a7a36}.form-container form{width:100%;padding:0rem 0 2.3rem 1rem}.form-container form label{font-size:1.2rem;margin-bottom:.2rem}.form-container form .field-container{width:100%;margin-bottom:1rem}.form-container form .field-container .input-field{display:block;width:97%;border-radius:.5rem;height:3rem;margin:.3rem 0;font-size:1.1rem;padding-left:.5rem;border:1px solid #d7d7d7;outline:none}.form-container form .field-container .error{border:1px solid #f00}.form-container form .field-container .error-message{color:red}.form-container form .btn-container{display:flex;justify-content:flex-end;height:2rem}.form-container form .btn-container button{color:#fff;text-align:center;border:none;border-radius:.5rem;min-width:10rem;height:3rem;font-size:1.2rem;margin-top:1rem}.form-container form .btn-container button{background:linear-gradient(to right top,#000000e8,#00000061);outline:none;cursor:pointer}.form-container form .btn-container button[disabled]{background:#b4b4b4;cursor:not-allowed}@media screen and (max-width: \"625px\"),(max-width: \"425px\"){.form-container{flex-direction:column;justify-content:center;align-items:center;width:15rem}.form-container h1{margin:0 0 2rem}.form-container form,.form-container button{width:100%}}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { fieldList: [{
                type: Input
            }], buttonLabel: [{
                type: Input
            }], errorMessages: [{
                type: Input
            }], formSubmit: [{
                type: Output
            }] } });

class DynamicFormWithValidationModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicFormWithValidationModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.2.12", ngImport: i0, type: DynamicFormWithValidationModule, declarations: [DynamicFormWithValidationComponent], imports: [BrowserModule,
            ReactiveFormsModule], exports: [DynamicFormWithValidationComponent] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicFormWithValidationModule, imports: [BrowserModule,
            ReactiveFormsModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicFormWithValidationModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        BrowserModule,
                        ReactiveFormsModule
                    ],
                    declarations: [DynamicFormWithValidationComponent],
                    exports: [DynamicFormWithValidationComponent]
                }]
        }] });

/**
 * Generated bundle index. Do not edit.
 */

export { DynamicFormWithValidationComponent, DynamicFormWithValidationModule };
//# sourceMappingURL=dynamic-form-with-validation.mjs.map
