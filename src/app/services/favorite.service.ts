import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private storageKey = 'favorite_pokemons';

  getFavorites(): number[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  isFavorite(id: number): boolean {
    const favorites = this.getFavorites();
    return favorites.includes(id);
  }

  toggleFavorite(id: number): void {
    let favorites = this.getFavorites();

    if (favorites.includes(id)) {
      favorites = favorites.filter((fav) => fav !== id);
    } else {
      favorites.push(id);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(favorites));
  }
}
