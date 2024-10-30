import { Injectable } from '@angular/core';
import {ArtsType} from "@type/arts.type";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private readonly storageKey = 'favorites';

  constructor() {}

  getFavorites(): ArtsType[] {
    const favorites = localStorage.getItem(this.storageKey);
    return favorites ? JSON.parse(favorites) : [];
  }

  addFavorite(item: ArtsType): void {
    const favorites: ArtsType[] = this.getFavorites();
    if (!favorites.find((fav: ArtsType) => fav.id === item.id)) {
      favorites.push(item);
      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFromFavorites(itemId: number): void {
    const favorites: ArtsType[] = this.getFavorites().filter((item: ArtsType) => item.id !== itemId);
    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }

  isFavorite(itemId: number): boolean {
    return this.getFavorites().some((item: ArtsType) => item.id === itemId);
  }
}
