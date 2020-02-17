import { Injectable } from '@angular/core';
import { FavoriteStorage } from '@core/interfaces/favorite-storage';

@Injectable({
  providedIn: 'root',
})
export class FavoriteStorageLocal implements FavoriteStorage {
  add(uid: string): void {
    localStorage.setItem(uid, 'true');
  }
  remove(uid: string): void {
    localStorage.removeItem(uid);
  }
  isFavorite(uid: string): boolean {
    return localStorage.hasOwnProperty(uid);
  }
}
