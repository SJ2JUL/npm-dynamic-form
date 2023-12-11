import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
export class DynamicFormWithValidationComponent {
    constructor() {
        this.buttonLabel = "Submit";
        this.formSubmit = new EventEmitter();
        this.errorMessages = {
            required: "is a required field.",
            invalid: "Please provide valid"
        };
    }
    ngOnInit() {
        this.loginForm = this.buildFormGroup();
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
        return this.loginForm.controls[fieldName].valid;
    }
    isTouched(fieldName) {
        return this.loginForm.controls[fieldName].touched;
    }
    onSubmit() {
        const updatedFormData = {};
        this.fieldList.forEach(field => {
            updatedFormData[field.name] = this.loginForm.controls[field.name].value;
        });
        this.formSubmit.emit(updatedFormData);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicFormWithValidationComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "16.2.12", type: DynamicFormWithValidationComponent, selector: "dynamic-form", inputs: { fieldList: "fieldList", buttonLabel: "buttonLabel" }, outputs: { formSubmit: "formSubmit" }, ngImport: i0, template: `
    <div class="form-container">
      <div class="card-title">
        <h1>Login</h1>
      </div>
      <form (ngSubmit)="onSubmit()" [formGroup]="loginForm">
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
            <div *ngIf="loginForm.controls[field.name].errors.required">
              {{ field.label }} {{ errorMessages.required }}
            </div>
            <div
              *ngIf="
                loginForm.controls[field.name].errors.email ||
                loginForm.controls[field.name].errors.pattern
              "
            >
              {{ errorMessages.invalid }} {{ field.label }}.
            </div>
          </div>
        </div>
        <div class="btn-container">
          <button type="submit" [disabled]="!loginForm.valid">
            {{ buttonLabel }}
          </button>
        </div>
      </form>
    </div>
  `, isInline: true, styles: [".form-container{background:linear-gradient(to right bottom,#fffc,#ffffff4d);border-radius:.5rem;z-index:2;-webkit-backdrop-filter:blur(2rem);backdrop-filter:blur(2rem);display:flex;justify-content:space-between;padding:2rem;width:30rem;box-shadow:6px 6px 20px #7a7a7a36}.form-container .card-title{width:30%}.form-container form{width:70%;padding:0rem 0 2.3rem 1rem}.form-container form label{font-size:1.2rem;margin-bottom:.2rem}.form-container form .field-container{width:100%;margin-bottom:1rem}.form-container form .field-container .input-field{display:block;width:97%;border-radius:.5rem;height:3rem;margin:.3rem 0;font-size:1.1rem;padding-left:.5rem;border:1px solid #d7d7d7;outline:none}.form-container form .field-container .error{border:1px solid #f00}.form-container form .field-container .error-message{color:red}.form-container form .btn-container{display:flex;justify-content:flex-end;height:2rem}.form-container form .btn-container button{color:#fff;text-align:center;border:none;border-radius:.5rem;min-width:10rem;height:3rem;font-size:1.2rem;margin-top:1rem}.form-container form .btn-container button{background:linear-gradient(to right top,#000000e8,#00000061);outline:none;cursor:pointer}.form-container form .btn-container button[disabled]{background:#b4b4b4;cursor:not-allowed}@media screen and (max-width: \"625px\"),(max-width: \"425px\"){.form-container{flex-direction:column;justify-content:center;align-items:center;width:15rem}.form-container h1{margin:0 0 2rem}.form-container form,.form-container button{width:100%}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i2.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i2.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.2.12", ngImport: i0, type: DynamicFormWithValidationComponent, decorators: [{
            type: Component,
            args: [{ selector: "dynamic-form", template: `
    <div class="form-container">
      <div class="card-title">
        <h1>Login</h1>
      </div>
      <form (ngSubmit)="onSubmit()" [formGroup]="loginForm">
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
            <div *ngIf="loginForm.controls[field.name].errors.required">
              {{ field.label }} {{ errorMessages.required }}
            </div>
            <div
              *ngIf="
                loginForm.controls[field.name].errors.email ||
                loginForm.controls[field.name].errors.pattern
              "
            >
              {{ errorMessages.invalid }} {{ field.label }}.
            </div>
          </div>
        </div>
        <div class="btn-container">
          <button type="submit" [disabled]="!loginForm.valid">
            {{ buttonLabel }}
          </button>
        </div>
      </form>
    </div>
  `, styles: [".form-container{background:linear-gradient(to right bottom,#fffc,#ffffff4d);border-radius:.5rem;z-index:2;-webkit-backdrop-filter:blur(2rem);backdrop-filter:blur(2rem);display:flex;justify-content:space-between;padding:2rem;width:30rem;box-shadow:6px 6px 20px #7a7a7a36}.form-container .card-title{width:30%}.form-container form{width:70%;padding:0rem 0 2.3rem 1rem}.form-container form label{font-size:1.2rem;margin-bottom:.2rem}.form-container form .field-container{width:100%;margin-bottom:1rem}.form-container form .field-container .input-field{display:block;width:97%;border-radius:.5rem;height:3rem;margin:.3rem 0;font-size:1.1rem;padding-left:.5rem;border:1px solid #d7d7d7;outline:none}.form-container form .field-container .error{border:1px solid #f00}.form-container form .field-container .error-message{color:red}.form-container form .btn-container{display:flex;justify-content:flex-end;height:2rem}.form-container form .btn-container button{color:#fff;text-align:center;border:none;border-radius:.5rem;min-width:10rem;height:3rem;font-size:1.2rem;margin-top:1rem}.form-container form .btn-container button{background:linear-gradient(to right top,#000000e8,#00000061);outline:none;cursor:pointer}.form-container form .btn-container button[disabled]{background:#b4b4b4;cursor:not-allowed}@media screen and (max-width: \"625px\"),(max-width: \"425px\"){.form-container{flex-direction:column;justify-content:center;align-items:center;width:15rem}.form-container h1{margin:0 0 2rem}.form-container form,.form-container button{width:100%}}\n"] }]
        }], ctorParameters: function () { return []; }, propDecorators: { fieldList: [{
                type: Input
            }], buttonLabel: [{
                type: Input
            }], formSubmit: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLXdpdGgtdmFsaWRhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9keW5hbWljLWZvcm0td2l0aC12YWxpZGF0aW9uL3NyYy9saWIvZHluYW1pYy1mb3JtLXdpdGgtdmFsaWRhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQXVKcEUsTUFBTSxPQUFPLGtDQUFrQztJQVU3QztRQVJTLGdCQUFXLEdBQVksUUFBUSxDQUFDO1FBQy9CLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBRXhDLGtCQUFhLEdBQUc7WUFDckIsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxPQUFPLEVBQUUsc0JBQXNCO1NBQ2hDLENBQUM7SUFFYyxDQUFDO0lBRWpCLFFBQVE7UUFDTixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsY0FBYztRQUNaLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNqQixJQUFJLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDOUIsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQkFDN0IsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDekM7WUFDRCxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFO2dCQUMxQixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QztZQUNELElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUU7Z0JBQzVCLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDbEU7WUFDRCxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQ3RFLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxPQUFPLENBQUMsU0FBUztRQUNmLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ2xELENBQUM7SUFFRCxTQUFTLENBQUMsU0FBUztRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNwRCxDQUFDO0lBRUQsUUFBUTtRQUNOLE1BQU0sZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM3QixlQUFlLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDMUUsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN4QyxDQUFDOytHQWpEVSxrQ0FBa0M7bUdBQWxDLGtDQUFrQywySkFwSW5DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDVDs7NEZBOEZVLGtDQUFrQztrQkF0STlDLFNBQVM7K0JBQ0UsY0FBYyxZQUNkOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNDVDswRUErRlEsU0FBUztzQkFBakIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNJLFVBQVU7c0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuLy8gSW50ZXJmYWNlc1xuZXhwb3J0IGludGVyZmFjZSBJRm9ybUZpZWxkIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIHZhbGlkYXRvcnM6IElGb3JtVmFsaWRhdGlvbjtcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRm9ybVZhbGlkYXRpb24ge1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIHBhdHRlcm4/OiBSZWdFeHAgfCBzdHJpbmc7XG4gIGVtYWlsPzogYm9vbGVhbjtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImR5bmFtaWMtZm9ybVwiLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWNvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzcz1cImNhcmQtdGl0bGVcIj5cbiAgICAgICAgPGgxPkxvZ2luPC9oMT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGZvcm0gKG5nU3VibWl0KT1cIm9uU3VibWl0KClcIiBbZm9ybUdyb3VwXT1cImxvZ2luRm9ybVwiPlxuICAgICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBmaWVsZCBvZiBmaWVsZExpc3RcIiBjbGFzcz1cImZpZWxkLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxsYWJlbCBbYXR0ci5mb3JdPVwiZmllbGQubmFtZVwiPnt7IGZpZWxkLmxhYmVsIH19PC9sYWJlbD5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZmllbGRcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBlcnJvcjogaXNUb3VjaGVkKGZpZWxkLm5hbWUpICYmICFpc1ZhbGlkKGZpZWxkLm5hbWUpIH1cIlxuICAgICAgICAgICAgW2Zvcm1Db250cm9sTmFtZV09XCJmaWVsZC5uYW1lXCJcbiAgICAgICAgICAgIFt0eXBlXT1cImZpZWxkLnR5cGVcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3M9XCJlcnJvci1tZXNzYWdlXCJcbiAgICAgICAgICAgICpuZ0lmPVwiaXNUb3VjaGVkKGZpZWxkLm5hbWUpICYmICFpc1ZhbGlkKGZpZWxkLm5hbWUpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2ICpuZ0lmPVwibG9naW5Gb3JtLmNvbnRyb2xzW2ZpZWxkLm5hbWVdLmVycm9ycy5yZXF1aXJlZFwiPlxuICAgICAgICAgICAgICB7eyBmaWVsZC5sYWJlbCB9fSB7eyBlcnJvck1lc3NhZ2VzLnJlcXVpcmVkIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgKm5nSWY9XCJcbiAgICAgICAgICAgICAgICBsb2dpbkZvcm0uY29udHJvbHNbZmllbGQubmFtZV0uZXJyb3JzLmVtYWlsIHx8XG4gICAgICAgICAgICAgICAgbG9naW5Gb3JtLmNvbnRyb2xzW2ZpZWxkLm5hbWVdLmVycm9ycy5wYXR0ZXJuXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt7IGVycm9yTWVzc2FnZXMuaW52YWxpZCB9fSB7eyBmaWVsZC5sYWJlbCB9fS5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1jb250YWluZXJcIj5cbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBbZGlzYWJsZWRdPVwiIWxvZ2luRm9ybS52YWxpZFwiPlxuICAgICAgICAgICAge3sgYnV0dG9uTGFiZWwgfX1cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Zvcm0+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5mb3JtLWNvbnRhaW5lciB7XG4gICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcbiAgICAgICAgICB0byByaWdodCBib3R0b20sXG4gICAgICAgICAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpLFxuICAgICAgICAgIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKVxuICAgICAgICApO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gICAgICAgIHotaW5kZXg6IDI7XG4gICAgICAgIGJhY2tkcm9wLWZpbHRlcjogYmx1cigycmVtKTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICBwYWRkaW5nOiAycmVtO1xuICAgICAgICB3aWR0aDogMzByZW07XG4gICAgICAgIGJveC1zaGFkb3c6IDZweCA2cHggMjBweCByZ2JhKDEyMiwgMTIyLCAxMjIsIDAuMjEyKTtcbiAgICAgIH1cbiAgICAgIC5mb3JtLWNvbnRhaW5lciAuY2FyZC10aXRsZSB7XG4gICAgICAgIHdpZHRoOiAzMCU7XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgZm9ybSB7XG4gICAgICAgIHdpZHRoOiA3MCU7XG4gICAgICAgIHBhZGRpbmc6IDByZW0gMCAyLjNyZW0gMXJlbTtcbiAgICAgIH1cbiAgICAgIC5mb3JtLWNvbnRhaW5lciBmb3JtIGxhYmVsIHtcbiAgICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDAuMnJlbTtcbiAgICAgIH1cbiAgICAgIC5mb3JtLWNvbnRhaW5lciBmb3JtIC5maWVsZC1jb250YWluZXIge1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbiAgICAgIH1cbiAgICAgIC5mb3JtLWNvbnRhaW5lciBmb3JtIC5maWVsZC1jb250YWluZXIgLmlucHV0LWZpZWxkIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIHdpZHRoOiA5NyU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbiAgICAgICAgaGVpZ2h0OiAzcmVtO1xuICAgICAgICBtYXJnaW46IDAuM3JlbSAwO1xuICAgICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwLjVyZW07XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNkN2Q3ZDc7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgZm9ybSAuZmllbGQtY29udGFpbmVyIC5lcnJvciB7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNmMDA7XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgZm9ybSAuZmllbGQtY29udGFpbmVyIC5lcnJvci1tZXNzYWdlIHtcbiAgICAgICAgY29sb3I6ICNmMDA7XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgZm9ybSAuYnRuLWNvbnRhaW5lciB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgICAgIGhlaWdodDogMnJlbTtcbiAgICAgIH1cbiAgICAgIC5mb3JtLWNvbnRhaW5lciBmb3JtIC5idG4tY29udGFpbmVyIGJ1dHRvbiB7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICAgICAgICBtaW4td2lkdGg6IDEwcmVtO1xuICAgICAgICBoZWlnaHQ6IDNyZW07XG4gICAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICAgICAgfVxuICAgICAgLmZvcm0tY29udGFpbmVyIGZvcm0gLmJ0bi1jb250YWluZXIgYnV0dG9uIHtcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0IHRvcCwgIzAwMDAwMGU4LCAjMDAwMDAwNjEpO1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgZm9ybSAuYnRuLWNvbnRhaW5lciBidXR0b25bZGlzYWJsZWRdIHtcbiAgICAgICAgYmFja2dyb3VuZDogI2I0YjRiNDtcbiAgICAgICAgY3Vyc29yOiBub3QtYWxsb3dlZDtcbiAgICAgIH1cbiAgICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IFwiNjI1cHhcIiksIChtYXgtd2lkdGg6IFwiNDI1cHhcIikge1xuICAgICAgICAuZm9ybS1jb250YWluZXIge1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICB3aWR0aDogMTVyZW07XG4gICAgICAgIH1cbiAgICAgICAgLmZvcm0tY29udGFpbmVyIGgxIHtcbiAgICAgICAgICBtYXJnaW46IDAgMCAycmVtIDA7XG4gICAgICAgIH1cbiAgICAgICAgLmZvcm0tY29udGFpbmVyIGZvcm0ge1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgICAgIC5mb3JtLWNvbnRhaW5lciBidXR0b24ge1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgYFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIER5bmFtaWNGb3JtV2l0aFZhbGlkYXRpb25Db21wb25lbnQge1xuICBASW5wdXQoKSBmaWVsZExpc3Q6IEFycmF5PElGb3JtRmllbGQ+O1xuICBASW5wdXQoKSBidXR0b25MYWJlbD86IHN0cmluZyA9IFwiU3VibWl0XCI7XG4gIEBPdXRwdXQoKSBmb3JtU3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyBsb2dpbkZvcm06IEZvcm1Hcm91cDtcbiAgcHVibGljIGVycm9yTWVzc2FnZXMgPSB7XG4gICAgcmVxdWlyZWQ6IFwiaXMgYSByZXF1aXJlZCBmaWVsZC5cIixcbiAgICBpbnZhbGlkOiBcIlBsZWFzZSBwcm92aWRlIHZhbGlkXCJcbiAgfTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMubG9naW5Gb3JtID0gdGhpcy5idWlsZEZvcm1Hcm91cCgpO1xuICB9XG5cbiAgYnVpbGRGb3JtR3JvdXAoKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB7fTtcbiAgICBsZXQgdmFsaWRhdG9yTGlzdCA9IFtdO1xuICAgIHRoaXMuZmllbGRMaXN0Py5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGlmIChmaWVsZC52YWxpZGF0b3JzLnJlcXVpcmVkKSB7XG4gICAgICAgIHZhbGlkYXRvckxpc3QucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZC52YWxpZGF0b3JzLmVtYWlsKSB7XG4gICAgICAgIHZhbGlkYXRvckxpc3QucHVzaChWYWxpZGF0b3JzLmVtYWlsKTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZC52YWxpZGF0b3JzLnBhdHRlcm4pIHtcbiAgICAgICAgdmFsaWRhdG9yTGlzdC5wdXNoKFZhbGlkYXRvcnMucGF0dGVybihmaWVsZC52YWxpZGF0b3JzLnBhdHRlcm4pKTtcbiAgICAgIH1cbiAgICAgIGdyb3VwW2ZpZWxkLm5hbWVdID0gbmV3IEZvcm1Db250cm9sKGZpZWxkLnZhbHVlIHx8IFwiXCIsIHZhbGlkYXRvckxpc3QpO1xuICAgICAgdmFsaWRhdG9yTGlzdCA9IFtdO1xuICAgIH0pO1xuICAgIHJldHVybiBuZXcgRm9ybUdyb3VwKGdyb3VwKTtcbiAgfVxuXG4gIGlzVmFsaWQoZmllbGROYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5Gb3JtLmNvbnRyb2xzW2ZpZWxkTmFtZV0udmFsaWQ7XG4gIH1cblxuICBpc1RvdWNoZWQoZmllbGROYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubG9naW5Gb3JtLmNvbnRyb2xzW2ZpZWxkTmFtZV0udG91Y2hlZDtcbiAgfVxuXG4gIG9uU3VibWl0KCkge1xuICAgIGNvbnN0IHVwZGF0ZWRGb3JtRGF0YSA9IHt9O1xuICAgIHRoaXMuZmllbGRMaXN0LmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgdXBkYXRlZEZvcm1EYXRhW2ZpZWxkLm5hbWVdID0gdGhpcy5sb2dpbkZvcm0uY29udHJvbHNbZmllbGQubmFtZV0udmFsdWU7XG4gICAgfSk7XG4gICAgdGhpcy5mb3JtU3VibWl0LmVtaXQodXBkYXRlZEZvcm1EYXRhKTtcbiAgfVxufVxuIl19