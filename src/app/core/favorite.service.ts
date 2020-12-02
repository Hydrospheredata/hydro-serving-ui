import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  add = (uid: string): void => localStorage.setItem(uid, 'true');
  remove = (uid: string): void => localStorage.removeItem(uid);
  isFavorite = (uid: string): boolean => localStorage.hasOwnProperty(uid);
}
