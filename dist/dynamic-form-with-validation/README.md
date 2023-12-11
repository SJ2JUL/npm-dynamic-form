# dynamic-form-with-validation

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Description

An npm lib for dynamic-form-with-validation

## Usage

Import `DynamicFormWithValidationModule` in your `app.module.ts` file

```
import { DynamicFormWithValidationModule } from 'dynamic-form-with-validation';

@NgModule({
  ...
  imports: [
    DynamicFormWithValidationModule
  ],
  ...
})
export class AppModule { }

```

After import use it in your component as follows

```
<dynamic-form [fieldList]="fieldList" [buttonLabel]="'Login'" (formSubmit)="onSubmit($event)">
```

`fieldList` is an Array of object with following interface

```
{
  name: string,
  label: string,
  type: string,
  value: string,
  validators: {
    required: boolean,
    email: boolean,
    pattern: string | RegExp
  },
}

```

Here is the sample `fieldList` array

```
fieldList = [
    {
      name: "email",
      label: "Email",
      type: "text",
      value: '',
      validators: {
        required: true,
        email: true
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      value: '',
      validators: {
        required: true,
      },
    }
  ];

```

