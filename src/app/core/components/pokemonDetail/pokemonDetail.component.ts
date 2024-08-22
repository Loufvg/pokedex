import { Component, OnInit, OnDestroy} from '@angular/core';
import { NgFor } from '@angular/common';
import { SharedDataService } from '@core/services/shared-data-pokemon';
import { Subscription } from 'rxjs';
import { Router,  NavigationStart } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-pokemonDetail',
    templateUrl: './pokemonDetail.component.html',
    styleUrls: ['./pokemonDetail.component.scss'],
    
imports: [NgFor]
})
export class PokemonDetail implements OnInit, OnDestroy  {
    private routerSubscription!: Subscription;

    constructor(private sharedDataService: SharedDataService, private router: Router) {}

    //initialize valors
    pokemonName:string = '';
    pokemonType: string = '';
    type: any[]=["normal", '#f8c718' ,"poison", '#72379E' ,"electric",' #FFD619', "ground",'#C7BC2F',"fairy",'#EC6397',"fire",'#ED5231 ',"grass",'#58BA44',"bug",'#C7BC2F',"water",'#03A3E1',"psychic",'#A064A8',"fighting",'#ECA54E',"rock",'#C0C0C0',"ghost",'#C0C0C0',"ice",' #03A3E1 ',"dragon",'#03A3E1'];
    allpokemons: { pic: string; id:string; name: string; type: string; height:number; health: string; attackPower: string }[] = [];
    chosenPokemon: { pic: string; id:string; name: string; type: string; height:number; health: string; attackPower: string }[] = [];

    ngOnInit(): void {
        //charge data shared by the list page
        this.pokemonName = this.sharedDataService.getChosenPokemonName();
        this.pokemonType = this.sharedDataService.getPokemonType();
        this.getPokemonDetail(this.pokemonName);
        this.getColorForCards(this.pokemonType, this.type);

        //clear data if change page
        this.routerSubscription = this.router.events.subscribe(event  => {
            if (event instanceof NavigationStart) {
                this.sharedDataService.clearData();
            }
        });
    }
    ngOnDestroy(): void {
        if (this.routerSubscription) {
            this.routerSubscription.unsubscribe();
        }
    }
    //navigation method for the button
    NavigateToPokemonList() {
        console.log("click work ! ")
        this.router.navigate(['/pokemonList']);
    }

    //method to get chosen pokemon details
    getPokemonDetail(pokemonName : string){
        console.log(this.chosenPokemon)
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
        // console.log(data);
        const results = data.results;
        const pokemon = {
            pic: data.sprites.front_default,
            id: data.id,
            name: data.name,
            type: data.types.map((typeInfo: any) => typeInfo.type.name).join(', '),
            height: data.height,
            health: data.stats.find((stat: any) => stat.stat.name === 'hp').base_stat,
            attackPower: data.stats.find((stat: any) => stat.stat.name === 'attack').base_stat
        };
        this.chosenPokemon.push(pokemon);
        });
    }
       // style color change by type 
        getColorForCards(pokemonType : string, typelist : any[]){
            const typePokemon = pokemonType.split(',', 1);
            const typeChose = typePokemon[0];
            console.log( typelist[typelist.indexOf(typeChose)+1]);
            const elemSelection = document.getElementById("fond") as HTMLInputElement;
            if (elemSelection == null){
                console.log("target not found")
            };
            elemSelection.style.backgroundColor = typelist[typelist.indexOf(typeChose)+1];
        }
}


