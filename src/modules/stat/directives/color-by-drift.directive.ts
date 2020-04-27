import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ColorPaletteService } from '@core/services/color-palette.service';

@Directive({
  selector: '[hsColorByDrift]',
})
export class ColorByDriftDirective implements OnInit {
  @Input() drift: number;

  constructor(
    private readonly el: ElementRef,
    private readonly colorPalette: ColorPaletteService
  ) {}

  ngOnInit(): void {
    if (this.drift === 0 || this.drift <= 0.35) {
      this.el.nativeElement.style.color = this.colorPalette.successColor();
    } else if (this.drift > 0.35 && this.drift <= 0.76) {
      this.el.nativeElement.style.color = this.colorPalette.alertColor();
    } else {
      this.el.nativeElement.style.color = this.colorPalette.warningColor();
    }
  }
}
