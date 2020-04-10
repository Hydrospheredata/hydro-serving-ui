import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorPaletteService {
  private readonly colors: ReadonlyArray<string> = [];

  getColors(): ReadonlyArray<string> {
    return this.colors;
  }

  getComplementaryColors(): Readonly<[string, string]> {
    return ['#7cb5ec', '#ffaf6e'];
  }

  getTrueFalseColors(): Readonly<[string, string]> {
    return ['red', 'blue'];
  }

  warningColor(): Readonly<string> {
    return '#CF1124'
  }
  alertColor(): Readonly<string> {
    return '#DE911D'
  }
  successColor(): Readonly<string> {
    return '#199473'
  }
}
