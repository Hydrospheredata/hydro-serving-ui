import { Injectable } from '@angular/core';
import { FavoriteStorage } from '@core/interfaces/favorite-storage';

@Injectable({
  providedIn: 'root',
})
export class ApplicationsFavoriteStorage implements FavoriteStorage {
  add(applicationName: string): void {
    localStorage.setItem(applicationName, 'true');
  }

  remove(applicationName: string): void {
    localStorage.removeItem(applicationName);
  }

  isFavorite(applicationName: string): boolean {
    return localStorage.hasOwnProperty(applicationName);
  }
}
