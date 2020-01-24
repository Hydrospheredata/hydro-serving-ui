import { Injectable } from '@angular/core';
import { FavoriteStorage } from '@core/interfaces/favorite-storage';

@Injectable({
  providedIn: 'root',
})
export class FavoriteStorageLocal implements FavoriteStorage {
  save(uid: string): void {
    localStorage.setItem(uid, 'true');
  }
  remove(uid: string): void {
    localStorage.removeItem(uid);
  }
  has(uid: string): boolean {
    return localStorage.hasOwnProperty(uid);
  }
}
