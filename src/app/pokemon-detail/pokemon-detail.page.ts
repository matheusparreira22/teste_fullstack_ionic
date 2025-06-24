import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiPokemonSerivce } from '../services/apiPokemon.service';
import {
  IonLabel,
  IonCard,
  IonHeader,
  IonTitle,
  IonList,
  IonItem,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonProgressBar,
  IonContent,
  IonBackButton,
  IonToolbar,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonImg
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  imports: [
    IonLabel,
    IonCard,
    IonHeader,
    IonTitle,
    IonList,
    IonItem,
    IonCardHeader,
    IonCardContent,
    IonCardTitle,
    IonProgressBar,
    CommonModule,
    IonContent,
    IonBackButton,
    IonToolbar,
    IonButtons,
    IonGrid,
    IonRow,
    IonCol,
    IonImg
  ],
})
export class PokemonDetailComponent implements OnInit {
  pokemon: any = {};
  species: any = {};

  constructor(
    private route: ActivatedRoute,
    private pokeapiService: ApiPokemonSerivce
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.pokeapiService.getPokemon(Number(id)).subscribe((data) => {
      this.pokemon = data;
      // Consulta adicional para species
      this.pokeapiService
        .getPokemonSpecies(data.species.name)
        .subscribe((speciesData) => {
          this.species = speciesData;
        });
    });
  }

  captureRateDescription(rate: number): string {
    if (rate >= 200) return 'Fácil';
    if (rate >= 100) return 'Médio';
    return 'Difícil';
  }
}
