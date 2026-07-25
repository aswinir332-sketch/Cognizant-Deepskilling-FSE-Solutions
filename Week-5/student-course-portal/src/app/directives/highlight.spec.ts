import { ElementRef, Renderer2 } from '@angular/core';
import { Highlight } from './highlight';

describe('Highlight', () => {
  it('should create an instance', () => {
    const element = new ElementRef(
      document.createElement('div')
    );

    const renderer = jasmine.createSpyObj<Renderer2>(
      'Renderer2',
      ['setStyle', 'removeStyle']
    );

    const directive = new Highlight(
      element,
      renderer
    );

    expect(directive).toBeTruthy();
  });
});