import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiPokemonSerivce {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(offset: number, limit: number) {
    const finalLimit = limit ?? 20;
    const offsetLimit = offset ?? 0;

    const url = `${this.baseUrl}pokemon?limit=${finalLimit}&offset=${offsetLimit}`;

    const response = this.http.get<any>(url);

    if (!response) {
      throw new Error('Erro ao buscar pokémon');
    }

    return response;
  }

  getPokemon(id: number | string) {
    const url = `${this.baseUrl}pokemon/${id} `;

    const response = this.http.get<any>(url);

    if (!response) {
      throw new Error('Erro ao buscar pokémon');
    }

    return response;
  }

  getAbility(idOrName: string | number) {
    return this.http.get(`${this.baseUrl}/ability/${idOrName}`);
  }

  getPokemonSprite(pokemonUrl: string)  {
    return this.http.get(pokemonUrl);
  }

  getPokemonSpecies(idOrName: string | number){
    return this.http.get(`${this.baseUrl}/pokemon-species/${idOrName}`);
  }
}
