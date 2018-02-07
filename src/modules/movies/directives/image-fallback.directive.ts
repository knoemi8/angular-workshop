import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[imageFallback]',
})
export class ImageFallbackDirective {
  @Input() imageFallback;

  @HostListener('error')
  setImage() {
    this.el.nativeElement.src = this.imageFallback
      ? this.imageFallback
      : 'assets/noImage1.jpg';
  }

  constructor(private el: ElementRef) {}
}
