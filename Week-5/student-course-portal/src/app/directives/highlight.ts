import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class Highlight {

  @Input()
  appHighlight = 'yellow';

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.renderer.setStyle(
      this.element.nativeElement,
      'background-color',
      this.appHighlight
    );
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.removeStyle(
      this.element.nativeElement,
      'background-color'
    );
  }
}