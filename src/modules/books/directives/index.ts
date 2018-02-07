import { DescriptionLengthValidatorDirective } from './description-length-validator.directive';
import { ImageFallbackDirective } from './image-fallback.directive';

export const directives: any[] = [
  ImageFallbackDirective,
  DescriptionLengthValidatorDirective,
];

export * from './image-fallback.directive';
export * from './description-length-validator.directive';
