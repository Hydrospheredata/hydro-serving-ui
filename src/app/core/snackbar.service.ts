import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { notificationType } from './data/types';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private notifier: NotifierService) {}

  notify(type: notificationType = 'default', message: string) {
    this.notifier.notify(type, message);
  }
}
