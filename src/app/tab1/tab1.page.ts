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
} from '@ionic/angular/standalone';
// import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  ],
})
export class Tab1Page implements OnInit {
  pokemons: any[] = [];
  limit = 20;
  offset = 0;
  totalCount = 0;

  constructor(private pokemonSerivce: ApiPokemonSerivce) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemonSerivce
      .getAll(this.offset, this.limit)
      .subscribe((response) => {
        this.pokemons = response.results.map((pokemon: any) => {
          const id = this.extractIdFromUrl(pokemon.url);
          return {
            name: pokemon.name,
            id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          };
        });
        this.totalCount = response.count;
      });
  }
  extractIdFromUrl(url: string): number {
    const segments = url.split('/').filter(Boolean);
    return Number(segments[segments.length - 1]);
  }
}
