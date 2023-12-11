import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormWithValidationComponent } from './dynamic-form-with-validation.component';



@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [DynamicFormWithValidationComponent],
  exports: [DynamicFormWithValidationComponent]
})
export class DynamicFormWithValidationModule { }
