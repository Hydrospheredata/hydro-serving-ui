import { MdlSnackbarService } from '@angular-mdl/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private mdlSnackBar: MdlSnackbarService) {}

  show({ message }: { message: string }) {
    this.mdlSnackBar.showSnackbar({
      message,
      timeout: 5000,
    });
  }
}
