import { Injectable } from '@angular/core';
import { ArtsType } from '@type/arts.type';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private readonly storageKey = 'favorites';

  constructor() {}

  getFavorites(): ArtsType[] {
    const favorites = localStorage.getItem(this.storageKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  toggleFavorite(item: ArtsType): void {
    const favorites: ArtsType[] = this.getFavorites();
    const itemIndex = favorites.findIndex((fav: ArtsType) => fav.id === item.id);
    if (itemIndex !== -1) {
      favorites.splice(itemIndex, 1);
    } else {
      favorites.push(item);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  isFavorite(itemId: number): boolean {
    return this.getFavorites().some((item: ArtsType): boolean => item.id === itemId);
  }
}
