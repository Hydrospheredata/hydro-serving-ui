import { TestBed } from '@angular/core/testing';

import { ColorPaletteService } from './color-palette.service';

describe('ColorPaletteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColorPaletteService = TestBed.get(ColorPaletteService);
    expect(service).toBeTruthy();
  });
});
