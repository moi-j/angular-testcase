import { AbstractControl, ValidatorFn } from "@angular/forms";

export function lettersValidator(): ValidatorFn {
  let nameRe: RegExp = /^[a-zA-ZáÁéÉíÍóÓúÚñÑÇàÀèÈìÌòÒùÙäÄëËïöÖüÜ]*$/;
  return (control: AbstractControl): {[key: string]: any} => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? null : {'onlyLetters': {value: control.value}};
  };
}
