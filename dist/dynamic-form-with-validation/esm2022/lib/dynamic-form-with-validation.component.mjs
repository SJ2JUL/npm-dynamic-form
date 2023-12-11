import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
export class DynamicFormWithValidationComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pYy1mb3JtLXdpdGgtdmFsaWRhdGlvbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9keW5hbWljLWZvcm0td2l0aC12YWxpZGF0aW9uL3NyYy9saWIvZHluYW1pYy1mb3JtLXdpdGgtdmFsaWRhdGlvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQXNKcEUsTUFBTSxPQUFPLGtDQUFrQztJQVU3QztRQVJTLGdCQUFXLEdBQVksUUFBUSxDQUFDO1FBQ2hDLGtCQUFhLEdBQW1CO1lBQ3ZDLFFBQVEsRUFBRSwyQkFBMkI7WUFDckMsT0FBTyxFQUFFLCtCQUErQjtTQUN6QyxDQUFDO1FBQ1EsZUFBVSxHQUFHLElBQUksWUFBWSxFQUFPLENBQUM7SUFHL0IsQ0FBQztJQUVqQixRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELGNBQWM7UUFDWixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlCLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdCLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3pDO1lBQ0QsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtnQkFDMUIsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEM7WUFDRCxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO2dCQUM1QixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ2xFO1lBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUN0RSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsT0FBTyxDQUFDLFNBQVM7UUFDZixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDO0lBRUQsU0FBUyxDQUFDLFNBQVM7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDcEQsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDN0IsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDeEMsQ0FBQzsrR0FqRFUsa0NBQWtDO21HQUFsQyxrQ0FBa0MsMkxBOUhuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ1Q7OzRGQTJGVSxrQ0FBa0M7a0JBaEk5QyxTQUFTOytCQUNFLGNBQWMsWUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ1Q7MEVBNEZRLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUlJLFVBQVU7c0JBQW5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEZvcm1Db250cm9sLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcblxuLy8gSW50ZXJmYWNlc1xuZXhwb3J0IGludGVyZmFjZSBJRm9ybUZpZWxkIHtcbiAgbmFtZTogc3RyaW5nO1xuICB0eXBlOiBzdHJpbmc7XG4gIHZhbGlkYXRvcnM6IElGb3JtVmFsaWRhdGlvbjtcbiAgbGFiZWw6IHN0cmluZztcbiAgdmFsdWU6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRm9ybVZhbGlkYXRpb24ge1xuICByZXF1aXJlZD86IGJvb2xlYW47XG4gIHBhdHRlcm4/OiBSZWdFeHAgfCBzdHJpbmc7XG4gIGVtYWlsPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJRXJyb3JNZXNzYWdlIHtcbiAgcmVxdWlyZWQ6IHN0cmluZztcbiAgaW52YWxpZDogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiZHluYW1pYy1mb3JtXCIsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBjbGFzcz1cImZvcm0tY29udGFpbmVyXCI+XG4gICAgICA8Zm9ybSAobmdTdWJtaXQpPVwib25TdWJtaXQoKVwiIFtmb3JtR3JvdXBdPVwiZm9ybUdyb3VwXCI+XG4gICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGZpZWxkIG9mIGZpZWxkTGlzdFwiIGNsYXNzPVwiZmllbGQtY29udGFpbmVyXCI+XG4gICAgICAgICAgPGxhYmVsIFthdHRyLmZvcl09XCJmaWVsZC5uYW1lXCI+e3sgZmllbGQubGFiZWwgfX08L2xhYmVsPlxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1maWVsZFwiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7IGVycm9yOiBpc1RvdWNoZWQoZmllbGQubmFtZSkgJiYgIWlzVmFsaWQoZmllbGQubmFtZSkgfVwiXG4gICAgICAgICAgICBbZm9ybUNvbnRyb2xOYW1lXT1cImZpZWxkLm5hbWVcIlxuICAgICAgICAgICAgW3R5cGVdPVwiZmllbGQudHlwZVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIlxuICAgICAgICAgICAgKm5nSWY9XCJpc1RvdWNoZWQoZmllbGQubmFtZSkgJiYgIWlzVmFsaWQoZmllbGQubmFtZSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJmb3JtR3JvdXAuY29udHJvbHNbZmllbGQubmFtZV0uZXJyb3JzLnJlcXVpcmVkXCI+XG4gICAgICAgICAgICAgIHt7IGVycm9yTWVzc2FnZXMucmVxdWlyZWQgfX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAqbmdJZj1cIlxuICAgICAgICAgICAgICAgIGZvcm1Hcm91cC5jb250cm9sc1tmaWVsZC5uYW1lXS5lcnJvcnMuZW1haWwgfHxcbiAgICAgICAgICAgICAgICBmb3JtR3JvdXAuY29udHJvbHNbZmllbGQubmFtZV0uZXJyb3JzLnBhdHRlcm5cbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3sgZXJyb3JNZXNzYWdlcy5pbnZhbGlkIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tY29udGFpbmVyXCI+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgW2Rpc2FibGVkXT1cIiFmb3JtR3JvdXAudmFsaWRcIj5cbiAgICAgICAgICAgIHt7IGJ1dHRvbkxhYmVsIH19XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAuZm9ybS1jb250YWluZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgICAgdG8gcmlnaHQgYm90dG9tLFxuICAgICAgICAgIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KSxcbiAgICAgICAgICByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMylcbiAgICAgICAgKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMnJlbSk7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgcGFkZGluZzogMnJlbTtcbiAgICAgICAgd2lkdGg6IDMwcmVtO1xuICAgICAgICBib3gtc2hhZG93OiA2cHggNnB4IDIwcHggcmdiYSgxMjIsIDEyMiwgMTIyLCAwLjIxMik7XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgZm9ybSB7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICBwYWRkaW5nOiAwcmVtIDAgMi4zcmVtIDFyZW07XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgZm9ybSBsYWJlbCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjJyZW07XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgZm9ybSAuZmllbGQtY29udGFpbmVyIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgZm9ybSAuZmllbGQtY29udGFpbmVyIC5pbnB1dC1maWVsZCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB3aWR0aDogOTclO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gICAgICAgIGhlaWdodDogM3JlbTtcbiAgICAgICAgbWFyZ2luOiAwLjNyZW0gMDtcbiAgICAgICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgICAgIHBhZGRpbmctbGVmdDogMC41cmVtO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZDdkN2Q3O1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgfVxuICAgICAgLmZvcm0tY29udGFpbmVyIGZvcm0gLmZpZWxkLWNvbnRhaW5lciAuZXJyb3Ige1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZjAwO1xuICAgICAgfVxuICAgICAgLmZvcm0tY29udGFpbmVyIGZvcm0gLmZpZWxkLWNvbnRhaW5lciAuZXJyb3ItbWVzc2FnZSB7XG4gICAgICAgIGNvbG9yOiAjZjAwO1xuICAgICAgfVxuICAgICAgLmZvcm0tY29udGFpbmVyIGZvcm0gLmJ0bi1jb250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICBoZWlnaHQ6IDJyZW07XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgZm9ybSAuYnRuLWNvbnRhaW5lciBidXR0b24ge1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbiAgICAgICAgbWluLXdpZHRoOiAxMHJlbTtcbiAgICAgICAgaGVpZ2h0OiAzcmVtO1xuICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICAgIH1cbiAgICAgIC5mb3JtLWNvbnRhaW5lciBmb3JtIC5idG4tY29udGFpbmVyIGJ1dHRvbiB7XG4gICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCB0b3AsICMwMDAwMDBlOCwgIzAwMDAwMDYxKTtcbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgfVxuICAgICAgLmZvcm0tY29udGFpbmVyIGZvcm0gLmJ0bi1jb250YWluZXIgYnV0dG9uW2Rpc2FibGVkXSB7XG4gICAgICAgIGJhY2tncm91bmQ6ICNiNGI0YjQ7XG4gICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgICB9XG4gICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiBcIjYyNXB4XCIpLCAobWF4LXdpZHRoOiBcIjQyNXB4XCIpIHtcbiAgICAgICAgLmZvcm0tY29udGFpbmVyIHtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgd2lkdGg6IDE1cmVtO1xuICAgICAgICB9XG4gICAgICAgIC5mb3JtLWNvbnRhaW5lciBoMSB7XG4gICAgICAgICAgbWFyZ2luOiAwIDAgMnJlbSAwO1xuICAgICAgICB9XG4gICAgICAgIC5mb3JtLWNvbnRhaW5lciBmb3JtIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgICAgICAuZm9ybS1jb250YWluZXIgYnV0dG9uIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBEeW5hbWljRm9ybVdpdGhWYWxpZGF0aW9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZmllbGRMaXN0OiBBcnJheTxJRm9ybUZpZWxkPjtcbiAgQElucHV0KCkgYnV0dG9uTGFiZWw/OiBzdHJpbmcgPSBcIlN1Ym1pdFwiO1xuICBASW5wdXQoKSBlcnJvck1lc3NhZ2VzPzogSUVycm9yTWVzc2FnZSA9IHtcbiAgICByZXF1aXJlZDogXCJUaGlzIGlzIGEgcmVxdWlyZWQgZmllbGQuXCIsXG4gICAgaW52YWxpZDogXCJQbGVhc2UgcHJvdmlkZSB2YWxpZCBkZXRhaWxzLlwiXG4gIH07XG4gIEBPdXRwdXQoKSBmb3JtU3VibWl0ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHB1YmxpYyBmb3JtR3JvdXA6IEZvcm1Hcm91cDtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZm9ybUdyb3VwID0gdGhpcy5idWlsZEZvcm1Hcm91cCgpO1xuICB9XG5cbiAgYnVpbGRGb3JtR3JvdXAoKSB7XG4gICAgY29uc3QgZ3JvdXAgPSB7fTtcbiAgICBsZXQgdmFsaWRhdG9yTGlzdCA9IFtdO1xuICAgIHRoaXMuZmllbGRMaXN0Py5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGlmIChmaWVsZC52YWxpZGF0b3JzLnJlcXVpcmVkKSB7XG4gICAgICAgIHZhbGlkYXRvckxpc3QucHVzaChWYWxpZGF0b3JzLnJlcXVpcmVkKTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZC52YWxpZGF0b3JzLmVtYWlsKSB7XG4gICAgICAgIHZhbGlkYXRvckxpc3QucHVzaChWYWxpZGF0b3JzLmVtYWlsKTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZC52YWxpZGF0b3JzLnBhdHRlcm4pIHtcbiAgICAgICAgdmFsaWRhdG9yTGlzdC5wdXNoKFZhbGlkYXRvcnMucGF0dGVybihmaWVsZC52YWxpZGF0b3JzLnBhdHRlcm4pKTtcbiAgICAgIH1cbiAgICAgIGdyb3VwW2ZpZWxkLm5hbWVdID0gbmV3IEZvcm1Db250cm9sKGZpZWxkLnZhbHVlIHx8IFwiXCIsIHZhbGlkYXRvckxpc3QpO1xuICAgICAgdmFsaWRhdG9yTGlzdCA9IFtdO1xuICAgIH0pO1xuICAgIHJldHVybiBuZXcgRm9ybUdyb3VwKGdyb3VwKTtcbiAgfVxuXG4gIGlzVmFsaWQoZmllbGROYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzW2ZpZWxkTmFtZV0udmFsaWQ7XG4gIH1cblxuICBpc1RvdWNoZWQoZmllbGROYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUdyb3VwLmNvbnRyb2xzW2ZpZWxkTmFtZV0udG91Y2hlZDtcbiAgfVxuXG4gIG9uU3VibWl0KCkge1xuICAgIGNvbnN0IHVwZGF0ZWRGb3JtRGF0YSA9IHt9O1xuICAgIHRoaXMuZmllbGRMaXN0LmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgdXBkYXRlZEZvcm1EYXRhW2ZpZWxkLm5hbWVdID0gdGhpcy5mb3JtR3JvdXAuY29udHJvbHNbZmllbGQubmFtZV0udmFsdWU7XG4gICAgfSk7XG4gICAgdGhpcy5mb3JtU3VibWl0LmVtaXQodXBkYXRlZEZvcm1EYXRhKTtcbiAgfVxufVxuIl19