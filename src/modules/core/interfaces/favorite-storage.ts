export interface FavoriteStorage {
  save: (uid: string) => void;
  remove: (uid: string) => void;
  has: (uid: string) => boolean;
}
