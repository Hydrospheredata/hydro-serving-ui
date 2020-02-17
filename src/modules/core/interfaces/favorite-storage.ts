export interface FavoriteStorage {
  add: (uid: string) => void;
  remove: (uid: string) => void;
  isFavorite: (uid: string) => boolean;
}
