import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorPaletteService {
  private readonly colors: ReadonlyArray<string> = [];

  getPalette(): ReadonlyArray<string> {
    return [
      '#418ecc',
      '#ffad37',
      '#ff716c',
      '#ddff64',
      '#85ff85',
      '#8cffd9',
      '#sef3ff',
      '#f59dfa',
      '#8a82ff',
      '#4362ff',
      '#6db7fa',
      '#b384f5',
      '#b366ac',
    ];
  }
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
    return '#CF1124';
  }
  alertColor(): Readonly<string> {
    return '#DE911D';
  }
  successColor(): Readonly<string> {
    return '#199473';
  }
}
