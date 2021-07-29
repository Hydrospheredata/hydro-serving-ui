import { MdlSnackbarService } from '@angular-mdl/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private mdlSnackBar: MdlSnackbarService) {}

  show({ message, timeout }: { message: string; timeout?: number }) {
    this.mdlSnackBar.showSnackbar({
      message,
      timeout: timeout ? timeout : 5000,
    });
  }
}
