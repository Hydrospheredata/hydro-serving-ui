import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[hsScaleImage]',
})
export class ScaleImageDirective implements OnInit {
  @Input() width;
  @Input() height;

  private minWidth: number = 100;
  private minHeight: number = 100;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    try {
      this.isValidInputs();
      if (this.imageMustBeScaled()) {
        this.scaleImage();
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }

  private isValidInputs() {
    if (!this.width || !this.height) {
      throw new Error('Height and width must be exist');
    }
  }

  private imageMustBeScaled(): boolean {
    return this.height < this.minHeight || this.width < this.minWidth;
  }

  private scaleImage(): void {
    let scale = 1;

    if (this.width === this.height || this.width < this.minWidth) {
      scale = this.minWidth / this.width;
    } else {
      scale = this.minHeight / this.height;
    }

    const transformStr = `transform: scale(${scale}); transform-origin: 0 0`;
    (this.el.nativeElement as HTMLElement).setAttribute(
      'style',
      transformStr
    );
  }
}
