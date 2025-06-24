import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonItem,
  IonAvatar,
  IonButtons,
  IonBackButton,
} from '@ionic/angular/standalone';
import { FavoriteService } from '../services/favorite.service';
import { ApiPokemonSerivce } from '../services/apiPokemon.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    IonList,
    IonLabel,
    IonItem,
    IonAvatar,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
  ],
})
export class FavoritesPage {
  favoritePokemons: any[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private pokemonService: ApiPokemonSerivce
  ) {}

  ionViewWillEnter() {
    this.loadFavorites();
  }

  async loadFavorites() {
    const ids = this.favoriteService.getFavorites();
    this.favoritePokemons = [];

    for (const id of ids) {
      this.pokemonService.getPokemon(id).subscribe((pokemon) => {
        this.favoritePokemons.push({
          id,
          name: pokemon.name,
          image: pokemon.sprites.front_default,
        });
      });
    }
  }
}
