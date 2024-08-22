import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { Router,  NavigationStart } from '@angular/router';
import { SharedDataService } from '@core/services/shared-data-pokemon';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-pokemonList',
  templateUrl: './pokemonList.component.html',
  styleUrls: ['./pokemonList.component.scss'],
  imports: [NgFor]
})
export class PokemonList implements OnInit, OnDestroy {

  // clear data from other page
  private routerSubscription: Subscription| undefined;

  //initialize valors
  filteredPokemons: { pic: string; id:string; name: string; type: string; height:number; health: string; attackPower: string }[] = [];
  pokemons: { pic: string; id:string; name: string; type: string; height:number; health: string; attackPower: string }[] = [];
  limit: number = 100;
  searchTerm: string = '';
  pokemonId: string = "pokemon";
  constructor(private router: Router, private sharedDataService: SharedDataService) { }

  // navigate to the detail page
  NavigateToPokemonDetail(id:string, type: string) {
    this.sharedDataService.setChosenPokemonName(id);
    this.sharedDataService.setPokemonType(type);
    this.router.navigate(['/pokemonDetail']);
  }
  ngOnInit(): void {
    this.getPokemon(this.limit);
  }
  // router subscription to detect route change 
  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
  //methode to fetch all data (list and details pokemon)
  getPokemon(limit: number): void {
    fetch(`https://pokeapi.co/api/v2/pokemon-species/?offset=0&limit=${limit}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const results = data.results;
        for (const result of results) {
          setTimeout(() => {
            fetch(`https://pokeapi.co/api/v2/pokemon/${result.name}`)
            .then((detailresponse)=> detailresponse.json())
            .then((detailData)=>{ 
              const pokemon = {
                pic: detailData.sprites.front_default,
                id: detailData.id,
                name: detailData.name,
                type: detailData.types.map((typeInfo: any) => typeInfo.type.name).join(', '),
                height: detailData.height,
                health: detailData.stats.find((stat: any) => stat.stat.name === 'hp').base_stat,
                attackPower: detailData.stats.find((stat: any) => stat.stat.name === 'attack').base_stat
              };
              this.pokemons.push(pokemon);
            });
            this.filteredPokemons = this.pokemons;
          }, 10)
        }
      })
      .catch((err) => {
        console.log("Pokemon not found", err);
      });
  }
  //research pokemon method
  searchPokemon(): void {
    var letSearchbar = document.getElementById('search') as HTMLInputElement;
    this.searchTerm = letSearchbar.value;
    console.log(this.searchTerm)
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
    console.log(this.filteredPokemons);
  }
}