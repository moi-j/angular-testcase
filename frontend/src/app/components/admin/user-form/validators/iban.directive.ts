/** A hero's name can't match the given regular expression */
import { AbstractControl, ValidatorFn } from "@angular/forms";

export function ibanValidator(): ValidatorFn {
  let nameRe: RegExp = /[a-zA-Z]{2}[0-9]{2}[a-zA-Z0-9]{4}[0-9]{7}([a-zA-Z0-9]?){0,16}/i;
  return (control: AbstractControl): {[key: string]: any} => {
    const forbidden = nameRe.test(control.value);
    console.log(forbidden);
    return forbidden ? null : {'wrongIban': {value: control.value}};
  };
}
