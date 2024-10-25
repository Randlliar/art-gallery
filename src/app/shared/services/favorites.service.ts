import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private readonly storageKey = 'favorites';

  constructor() {}

  getFavorites(): any[] {
    const favorites = localStorage.getItem(this.storageKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavorite(item: any): void {
    const favorites = this.getFavorites();
    if (!favorites.find(fav => fav.id === item.id)) {
      favorites.push(item);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFromFavorites(itemId: number): void {
    const favorites = this.getFavorites().filter(item => item.id !== itemId);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  isFavorite(itemId: number): boolean {
    return this.getFavorites().some(item => item.id === itemId);
  }
}
