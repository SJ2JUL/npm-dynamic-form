import { EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
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
export declare class LoginWithDynamicFormComponent {
    fieldList: Array<IFormField>;
    buttonLabel?: string;
    formSubmit: EventEmitter<any>;
    loginForm: FormGroup;
    errorMessages: {
        required: string;
        invalid: string;
    };
    constructor();
    ngOnInit(): void;
    buildFormGroup(): FormGroup;
    isValid(fieldName: any): boolean;
    isTouched(fieldName: any): boolean;
    onSubmit(): void;
}
