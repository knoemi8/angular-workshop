import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[minDescriptionWords]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: DescriptionLengthValidatorDirective,
      multi: true,
    },
  ],
})
export class DescriptionLengthValidatorDirective implements Validator {
  @Input() minDescriptionWords: string;

  validate(control: AbstractControl): { [key: string]: any } {
    const desiredLength = parseInt(this.minDescriptionWords, 10);
    let wordCount = 0;
    if (control && control.value) {
      wordCount = control.value
        .trim()
        .replace(/  +/g, ' ')
        .split(' ').length;
    }
    return this.minDescriptionWords &&
      !isNaN(desiredLength) &&
      wordCount >= desiredLength
      ? null
      : { minDescriptionWords: true };
  }
}
