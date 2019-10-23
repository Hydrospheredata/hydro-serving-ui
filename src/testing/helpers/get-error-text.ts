import { DebugElement } from '@angular/core';
import { getNativeElement } from '@testing/helpers/get-native-element';

export function getErrorText(de: DebugElement): string {
  return getNativeElement(de).querySelector('.error').textContent;
}
