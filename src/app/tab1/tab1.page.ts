import { ApiPokemonSerivce } from './../services/apiPokemon.service';
import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonAvatar,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../services/favorite.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    CommonModule,
    IonAvatar,
    IonItem,
    IonButton,
    IonIcon,
  ],
})
export class Tab1Page implements OnInit {
  pokemons: any[] = [];
  limit = 12;
  offset = 0;
  totalCount = 0;
  currentPage = 1;
  totalPages = 1;

  constructor(
    private pokemonSerivce: ApiPokemonSerivce,
    private router: Router,
    private favoriteService: FavoriteService,
  ) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.offset = (this.currentPage - 1) * this.limit;

    this.pokemonSerivce
      .getAll(this.offset, this.limit)
      .subscribe((response) => {
        this.totalCount = response.count;
        this.totalPages = Math.ceil(this.totalCount / this.limit);

        this.pokemons = response.results.map((pokemon: any) => {
          const id = this.extractIdFromUrl(pokemon.url);
          return {
            name: pokemon.name,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        });
      });
  }

  extractIdFromUrl(url: string): number {
    const segments = url.split('/').filter(Boolean);
    return Number(segments[segments.length - 1]);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPokemons();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPokemons();
    }
  }

  showDetails(id: number) {
    this.router.navigate(['/tabs/pokemon', id]); // ✅ caminho correto

  }

  isFavorite(id: number): boolean {
    return this.favoriteService.isFavorite(id);
  }

  toggleFavorite(id: number) {
    this.favoriteService.toggleFavorite(id);
  }
}
