import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
})
export class ApiPokemonSerivce{
    private baseUrl = environment.apiUrl
    
    constructor(private http: HttpClient){}
    
     getAll(offset: number, limit: number){
        const finalLimit = limit ?? 20
        const offsetLimit = offset ?? 0

        const url = `${this.baseUrl}pokemon?limit=${finalLimit}&offset=${offsetLimit}`

        const response = this.http.get<any>(url)

        if(!response){
            throw new Error('Erro ao buscar pokémon')
        }

        return response
    }
}