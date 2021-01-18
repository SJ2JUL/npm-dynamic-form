(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/platform-browser')) :
  typeof define === 'function' && define.amd ? define('login-with-dynamic-form', ['exports', '@angular/core', '@angular/forms', '@angular/platform-browser'], factory) :
  (global = global || self, factory(global['login-with-dynamic-form'] = {}, global.ng.core, global.ng.forms, global.ng.platformBrowser));
}(this, (function (exports, core, forms, platformBrowser) { 'use strict';

  var LoginWithDynamicFormComponent = /** @class */ (function () {
      function LoginWithDynamicFormComponent() {
          this.buttonLabel = "Submit";
          this.formSubmit = new core.EventEmitter();
          this.errorMessages = {
              required: "is a required field.",
              invalid: "Please provide valid"
          };
      }
      LoginWithDynamicFormComponent.prototype.ngOnInit = function () {
          this.loginForm = this.buildFormGroup();
      };
      LoginWithDynamicFormComponent.prototype.buildFormGroup = function () {
          var group = {};
          var validatorList = [];
          this.fieldList.forEach(function (field) {
              if (field.validators.required) {
                  validatorList.push(forms.Validators.required);
              }
              if (field.validators.email) {
                  validatorList.push(forms.Validators.email);
              }
              if (field.validators.pattern) {
                  validatorList.push(forms.Validators.pattern(field.validators.pattern));
              }
              group[field.name] = new forms.FormControl(field.value || "", validatorList);
              validatorList = [];
          });
          return new forms.FormGroup(group);
      };
      LoginWithDynamicFormComponent.prototype.isValid = function (fieldName) {
          return this.loginForm.controls[fieldName].valid;
      };
      LoginWithDynamicFormComponent.prototype.isTouched = function (fieldName) {
          return this.loginForm.controls[fieldName].touched;
      };
      LoginWithDynamicFormComponent.prototype.onSubmit = function () {
          var _this = this;
          var updatedFormData = {};
          this.fieldList.forEach(function (field) {
              updatedFormData[field.name] = _this.loginForm.controls[field.name].value;
          });
          this.formSubmit.emit(updatedFormData);
      };
      return LoginWithDynamicFormComponent;
  }());
  LoginWithDynamicFormComponent.decorators = [
      { type: core.Component, args: [{
                  selector: "lib-login-with-dynamic-form",
                  template: "\n    <div class=\"form-container\">\n      <div class=\"card-title\">\n        <h1>Login</h1>\n      </div>\n      <form (ngSubmit)=\"onSubmit()\" [formGroup]=\"loginForm\">\n        <div *ngFor=\"let field of fieldList\" class=\"field-container\">\n          <label [attr.for]=\"field.name\">{{ field.label }}</label>\n          <input\n            class=\"input-field\"\n            [ngClass]=\"{ error: isTouched(field.name) && !isValid(field.name) }\"\n            [formControlName]=\"field.name\"\n            [type]=\"field.type\"\n          />\n          <div\n            class=\"error-message\"\n            *ngIf=\"isTouched(field.name) && !isValid(field.name)\"\n          >\n            <div *ngIf=\"loginForm.controls[field.name].errors.required\">\n              {{ field.label }} {{ errorMessages.required }}\n            </div>\n            <div\n              *ngIf=\"\n                loginForm.controls[field.name].errors.email ||\n                loginForm.controls[field.name].errors.pattern\n              \"\n            >\n              {{ errorMessages.invalid }} {{ field.label }}.\n            </div>\n          </div>\n        </div>\n        <div class=\"btn-container\">\n          <button type=\"submit\" [disabled]=\"!loginForm.valid\">\n            {{ buttonLabel }}\n          </button>\n        </div>\n      </form>\n    </div>\n  ",
                  styles: ["\n      .form-container {\n        background: linear-gradient(\n          to right bottom,\n          rgba(255, 255, 255, 0.8),\n          rgba(255, 255, 255, 0.3)\n        );\n        border-radius: 0.5rem;\n        z-index: 2;\n        backdrop-filter: blur(2rem);\n        display: flex;\n        justify-content: space-between;\n        padding: 2rem;\n        width: 30rem;\n        box-shadow: 6px 6px 20px rgba(122, 122, 122, 0.212);\n      }\n      .form-container .card-title {\n        width: 30%;\n      }\n      .form-container form {\n        width: 70%;\n        padding: 0rem 0 2.3rem 1rem;\n      }\n      .form-container form label {\n        font-size: 1.2rem;\n        margin-bottom: 0.2rem;\n      }\n      .form-container form .field-container {\n        width: 100%;\n        margin-bottom: 1rem;\n      }\n      .form-container form .field-container .input-field {\n        display: block;\n        width: 97%;\n        border-radius: 0.5rem;\n        height: 3rem;\n        margin: 0.3rem 0;\n        font-size: 1.1rem;\n        padding-left: 0.5rem;\n        border: 1px solid #d7d7d7;\n        outline: none;\n      }\n      .form-container form .field-container .error {\n        border: 1px solid #f00;\n      }\n      .form-container form .field-container .error-message {\n        color: #f00;\n      }\n      .form-container form .btn-container {\n        display: flex;\n        justify-content: flex-end;\n        height: 2rem;\n      }\n      .form-container form .btn-container button {\n        color: #fff;\n        text-align: center;\n        border: none;\n        border-radius: 0.5rem;\n        min-width: 10rem;\n        height: 3rem;\n        font-size: 1.2rem;\n        margin-top: 1rem;\n      }\n      .form-container form .btn-container button {\n        background: linear-gradient(to right top, #000000e8, #00000061);\n        outline: none;\n        cursor: pointer;\n      }\n      .form-container form .btn-container button[disabled] {\n        background: #b4b4b4;\n        cursor: not-allowed;\n      }\n      @media screen and (max-width: \"625px\"), (max-width: \"425px\") {\n        .form-container {\n          flex-direction: column;\n          justify-content: center;\n          align-items: center;\n          width: 15rem;\n        }\n        .form-container h1 {\n          margin: 0 0 2rem 0;\n        }\n        .form-container form {\n          width: 100%;\n        }\n        .form-container button {\n          width: 100%;\n        }\n      }\n    "]
              },] }
  ];
  LoginWithDynamicFormComponent.ctorParameters = function () { return []; };
  LoginWithDynamicFormComponent.propDecorators = {
      fieldList: [{ type: core.Input }],
      buttonLabel: [{ type: core.Input }],
      formSubmit: [{ type: core.Output }]
  };

  var LoginWithDynamicFormModule = /** @class */ (function () {
      function LoginWithDynamicFormModule() {
      }
      return LoginWithDynamicFormModule;
  }());
  LoginWithDynamicFormModule.decorators = [
      { type: core.NgModule, args: [{
                  imports: [
                      platformBrowser.BrowserModule,
                      forms.ReactiveFormsModule
                  ],
                  declarations: [LoginWithDynamicFormComponent],
                  exports: [LoginWithDynamicFormComponent]
              },] }
  ];

  /**
   * Generated bundle index. Do not edit.
   */

  exports.LoginWithDynamicFormComponent = LoginWithDynamicFormComponent;
  exports.LoginWithDynamicFormModule = LoginWithDynamicFormModule;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=login-with-dynamic-form.umd.js.map
