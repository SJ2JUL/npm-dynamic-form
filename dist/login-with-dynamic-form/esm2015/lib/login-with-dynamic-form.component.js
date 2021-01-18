import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
export class LoginWithDynamicFormComponent {
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
        this.fieldList.forEach(field => {
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
}
LoginWithDynamicFormComponent.decorators = [
    { type: Component, args: [{
                selector: "lib-login-with-dynamic-form",
                template: `
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
  `,
                styles: [`
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
      .form-container .card-title {
        width: 30%;
      }
      .form-container form {
        width: 70%;
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
    `]
            },] }
];
LoginWithDynamicFormComponent.ctorParameters = () => [];
LoginWithDynamicFormComponent.propDecorators = {
    fieldList: [{ type: Input }],
    buttonLabel: [{ type: Input }],
    formSubmit: [{ type: Output }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4td2l0aC1keW5hbWljLWZvcm0uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9nYXV0YW12YW5hbWEvRG9jdW1lbnRzL1dPUktTUEFDRS9ucG0tcGFja2FnZXMtY3VzdG9tL2xvZ2luLXdpdGgtdmFsaWRhdGlvbi9wcm9qZWN0cy9sb2dpbi13aXRoLWR5bmFtaWMtZm9ybS9zcmMvIiwic291cmNlcyI6WyJsaWIvbG9naW4td2l0aC1keW5hbWljLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFDL0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUF1SnBFLE1BQU0sT0FBTyw2QkFBNkI7SUFVeEM7UUFSUyxnQkFBVyxHQUFZLFFBQVEsQ0FBQztRQUMvQixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUV4QyxrQkFBYSxHQUFHO1lBQ3JCLFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsT0FBTyxFQUFFLHNCQUFzQjtTQUNoQyxDQUFDO0lBRWMsQ0FBQztJQUVqQixRQUFRO1FBQ04sSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELGNBQWM7UUFDWixNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzdCLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQzdCLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3pDO1lBQ0QsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRTtnQkFDMUIsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEM7WUFDRCxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO2dCQUM1QixhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2FBQ2xFO1lBQ0QsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQztZQUN0RSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsT0FBTyxDQUFDLFNBQVM7UUFDZixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNsRCxDQUFDO0lBRUQsU0FBUyxDQUFDLFNBQVM7UUFDakIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDcEQsQ0FBQztJQUVELFFBQVE7UUFDTixNQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDN0IsZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQzFFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7O1lBdkxGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsNkJBQTZCO2dCQUN2QyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NUO3lCQUVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXlGQzthQUVKOzs7O3dCQUVFLEtBQUs7MEJBQ0wsS0FBSzt5QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybUdyb3VwLCBWYWxpZGF0b3JzIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5cbi8vIEludGVyZmFjZXNcbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1GaWVsZCB7XG4gIG5hbWU6IHN0cmluZztcbiAgdHlwZTogc3RyaW5nO1xuICB2YWxpZGF0b3JzOiBJRm9ybVZhbGlkYXRpb247XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUZvcm1WYWxpZGF0aW9uIHtcbiAgcmVxdWlyZWQ/OiBib29sZWFuO1xuICBwYXR0ZXJuPzogUmVnRXhwIHwgc3RyaW5nO1xuICBlbWFpbD86IGJvb2xlYW47XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJsaWItbG9naW4td2l0aC1keW5hbWljLWZvcm1cIixcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1jb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXRpdGxlXCI+XG4gICAgICAgIDxoMT5Mb2dpbjwvaDE+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxmb3JtIChuZ1N1Ym1pdCk9XCJvblN1Ym1pdCgpXCIgW2Zvcm1Hcm91cF09XCJsb2dpbkZvcm1cIj5cbiAgICAgICAgPGRpdiAqbmdGb3I9XCJsZXQgZmllbGQgb2YgZmllbGRMaXN0XCIgY2xhc3M9XCJmaWVsZC1jb250YWluZXJcIj5cbiAgICAgICAgICA8bGFiZWwgW2F0dHIuZm9yXT1cImZpZWxkLm5hbWVcIj57eyBmaWVsZC5sYWJlbCB9fTwvbGFiZWw+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzcz1cImlucHV0LWZpZWxkXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgZXJyb3I6IGlzVG91Y2hlZChmaWVsZC5uYW1lKSAmJiAhaXNWYWxpZChmaWVsZC5uYW1lKSB9XCJcbiAgICAgICAgICAgIFtmb3JtQ29udHJvbE5hbWVdPVwiZmllbGQubmFtZVwiXG4gICAgICAgICAgICBbdHlwZV09XCJmaWVsZC50eXBlXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiXG4gICAgICAgICAgICAqbmdJZj1cImlzVG91Y2hlZChmaWVsZC5uYW1lKSAmJiAhaXNWYWxpZChmaWVsZC5uYW1lKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImxvZ2luRm9ybS5jb250cm9sc1tmaWVsZC5uYW1lXS5lcnJvcnMucmVxdWlyZWRcIj5cbiAgICAgICAgICAgICAge3sgZmllbGQubGFiZWwgfX0ge3sgZXJyb3JNZXNzYWdlcy5yZXF1aXJlZCB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAgICAgbG9naW5Gb3JtLmNvbnRyb2xzW2ZpZWxkLm5hbWVdLmVycm9ycy5lbWFpbCB8fFxuICAgICAgICAgICAgICAgIGxvZ2luRm9ybS5jb250cm9sc1tmaWVsZC5uYW1lXS5lcnJvcnMucGF0dGVyblxuICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7eyBlcnJvck1lc3NhZ2VzLmludmFsaWQgfX0ge3sgZmllbGQubGFiZWwgfX0uXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tY29udGFpbmVyXCI+XG4gICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgW2Rpc2FibGVkXT1cIiFsb2dpbkZvcm0udmFsaWRcIj5cbiAgICAgICAgICAgIHt7IGJ1dHRvbkxhYmVsIH19XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAuZm9ybS1jb250YWluZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAgICAgdG8gcmlnaHQgYm90dG9tLFxuICAgICAgICAgIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KSxcbiAgICAgICAgICByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMylcbiAgICAgICAgKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgICBiYWNrZHJvcC1maWx0ZXI6IGJsdXIoMnJlbSk7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgcGFkZGluZzogMnJlbTtcbiAgICAgICAgd2lkdGg6IDMwcmVtO1xuICAgICAgICBib3gtc2hhZG93OiA2cHggNnB4IDIwcHggcmdiYSgxMjIsIDEyMiwgMTIyLCAwLjIxMik7XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgLmNhcmQtdGl0bGUge1xuICAgICAgICB3aWR0aDogMzAlO1xuICAgICAgfVxuICAgICAgLmZvcm0tY29udGFpbmVyIGZvcm0ge1xuICAgICAgICB3aWR0aDogNzAlO1xuICAgICAgICBwYWRkaW5nOiAwcmVtIDAgMi4zcmVtIDFyZW07XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgZm9ybSBsYWJlbCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwLjJyZW07XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgZm9ybSAuZmllbGQtY29udGFpbmVyIHtcbiAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDFyZW07XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgZm9ybSAuZmllbGQtY29udGFpbmVyIC5pbnB1dC1maWVsZCB7XG4gICAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgICB3aWR0aDogOTclO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gICAgICAgIGhlaWdodDogM3JlbTtcbiAgICAgICAgbWFyZ2luOiAwLjNyZW0gMDtcbiAgICAgICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgICAgIHBhZGRpbmctbGVmdDogMC41cmVtO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZDdkN2Q3O1xuICAgICAgICBvdXRsaW5lOiBub25lO1xuICAgICAgfVxuICAgICAgLmZvcm0tY29udGFpbmVyIGZvcm0gLmZpZWxkLWNvbnRhaW5lciAuZXJyb3Ige1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZjAwO1xuICAgICAgfVxuICAgICAgLmZvcm0tY29udGFpbmVyIGZvcm0gLmZpZWxkLWNvbnRhaW5lciAuZXJyb3ItbWVzc2FnZSB7XG4gICAgICAgIGNvbG9yOiAjZjAwO1xuICAgICAgfVxuICAgICAgLmZvcm0tY29udGFpbmVyIGZvcm0gLmJ0bi1jb250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICAgICAgICBoZWlnaHQ6IDJyZW07XG4gICAgICB9XG4gICAgICAuZm9ybS1jb250YWluZXIgZm9ybSAuYnRuLWNvbnRhaW5lciBidXR0b24ge1xuICAgICAgICBjb2xvcjogI2ZmZjtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbiAgICAgICAgbWluLXdpZHRoOiAxMHJlbTtcbiAgICAgICAgaGVpZ2h0OiAzcmVtO1xuICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgICAgbWFyZ2luLXRvcDogMXJlbTtcbiAgICAgIH1cbiAgICAgIC5mb3JtLWNvbnRhaW5lciBmb3JtIC5idG4tY29udGFpbmVyIGJ1dHRvbiB7XG4gICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCh0byByaWdodCB0b3AsICMwMDAwMDBlOCwgIzAwMDAwMDYxKTtcbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgfVxuICAgICAgLmZvcm0tY29udGFpbmVyIGZvcm0gLmJ0bi1jb250YWluZXIgYnV0dG9uW2Rpc2FibGVkXSB7XG4gICAgICAgIGJhY2tncm91bmQ6ICNiNGI0YjQ7XG4gICAgICAgIGN1cnNvcjogbm90LWFsbG93ZWQ7XG4gICAgICB9XG4gICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiBcIjYyNXB4XCIpLCAobWF4LXdpZHRoOiBcIjQyNXB4XCIpIHtcbiAgICAgICAgLmZvcm0tY29udGFpbmVyIHtcbiAgICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgd2lkdGg6IDE1cmVtO1xuICAgICAgICB9XG4gICAgICAgIC5mb3JtLWNvbnRhaW5lciBoMSB7XG4gICAgICAgICAgbWFyZ2luOiAwIDAgMnJlbSAwO1xuICAgICAgICB9XG4gICAgICAgIC5mb3JtLWNvbnRhaW5lciBmb3JtIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgICAgICAuZm9ybS1jb250YWluZXIgYnV0dG9uIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIGBcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbldpdGhEeW5hbWljRm9ybUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGZpZWxkTGlzdDogQXJyYXk8SUZvcm1GaWVsZD47XG4gIEBJbnB1dCgpIGJ1dHRvbkxhYmVsPzogc3RyaW5nID0gXCJTdWJtaXRcIjtcbiAgQE91dHB1dCgpIGZvcm1TdWJtaXQgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHVibGljIGxvZ2luRm9ybTogRm9ybUdyb3VwO1xuICBwdWJsaWMgZXJyb3JNZXNzYWdlcyA9IHtcbiAgICByZXF1aXJlZDogXCJpcyBhIHJlcXVpcmVkIGZpZWxkLlwiLFxuICAgIGludmFsaWQ6IFwiUGxlYXNlIHByb3ZpZGUgdmFsaWRcIlxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5sb2dpbkZvcm0gPSB0aGlzLmJ1aWxkRm9ybUdyb3VwKCk7XG4gIH1cblxuICBidWlsZEZvcm1Hcm91cCgpIHtcbiAgICBjb25zdCBncm91cCA9IHt9O1xuICAgIGxldCB2YWxpZGF0b3JMaXN0ID0gW107XG4gICAgdGhpcy5maWVsZExpc3QuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICBpZiAoZmllbGQudmFsaWRhdG9ycy5yZXF1aXJlZCkge1xuICAgICAgICB2YWxpZGF0b3JMaXN0LnB1c2goVmFsaWRhdG9ycy5yZXF1aXJlZCk7XG4gICAgICB9XG4gICAgICBpZiAoZmllbGQudmFsaWRhdG9ycy5lbWFpbCkge1xuICAgICAgICB2YWxpZGF0b3JMaXN0LnB1c2goVmFsaWRhdG9ycy5lbWFpbCk7XG4gICAgICB9XG4gICAgICBpZiAoZmllbGQudmFsaWRhdG9ycy5wYXR0ZXJuKSB7XG4gICAgICAgIHZhbGlkYXRvckxpc3QucHVzaChWYWxpZGF0b3JzLnBhdHRlcm4oZmllbGQudmFsaWRhdG9ycy5wYXR0ZXJuKSk7XG4gICAgICB9XG4gICAgICBncm91cFtmaWVsZC5uYW1lXSA9IG5ldyBGb3JtQ29udHJvbChmaWVsZC52YWx1ZSB8fCBcIlwiLCB2YWxpZGF0b3JMaXN0KTtcbiAgICAgIHZhbGlkYXRvckxpc3QgPSBbXTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmV3IEZvcm1Hcm91cChncm91cCk7XG4gIH1cblxuICBpc1ZhbGlkKGZpZWxkTmFtZSkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luRm9ybS5jb250cm9sc1tmaWVsZE5hbWVdLnZhbGlkO1xuICB9XG5cbiAgaXNUb3VjaGVkKGZpZWxkTmFtZSkge1xuICAgIHJldHVybiB0aGlzLmxvZ2luRm9ybS5jb250cm9sc1tmaWVsZE5hbWVdLnRvdWNoZWQ7XG4gIH1cblxuICBvblN1Ym1pdCgpIHtcbiAgICBjb25zdCB1cGRhdGVkRm9ybURhdGEgPSB7fTtcbiAgICB0aGlzLmZpZWxkTGlzdC5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIHVwZGF0ZWRGb3JtRGF0YVtmaWVsZC5uYW1lXSA9IHRoaXMubG9naW5Gb3JtLmNvbnRyb2xzW2ZpZWxkLm5hbWVdLnZhbHVlO1xuICAgIH0pO1xuICAgIHRoaXMuZm9ybVN1Ym1pdC5lbWl0KHVwZGF0ZWRGb3JtRGF0YSk7XG4gIH1cbn1cbiJdfQ==