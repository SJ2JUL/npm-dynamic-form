import { EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";
import * as i0 from "@angular/core";
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
export declare class DynamicFormWithValidationComponent {
    fieldList: Array<IFormField>;
    buttonLabel?: string;
    errorMessages?: IErrorMessage;
    formSubmit: EventEmitter<any>;
    formGroup: FormGroup;
    constructor();
    ngOnInit(): void;
    buildFormGroup(): FormGroup<{}>;
    isValid(fieldName: any): boolean;
    isTouched(fieldName: any): boolean;
    onSubmit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicFormWithValidationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DynamicFormWithValidationComponent, "dynamic-form", never, { "fieldList": { "alias": "fieldList"; "required": false; }; "buttonLabel": { "alias": "buttonLabel"; "required": false; }; "errorMessages": { "alias": "errorMessages"; "required": false; }; }, { "formSubmit": "formSubmit"; }, never, never, false, never>;
}
