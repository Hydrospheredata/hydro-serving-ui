import { DebugElement } from '@angular/core';

export function getNativeElement(de: DebugElement): HTMLElement {
  return de.nativeElement as HTMLElement;
}
