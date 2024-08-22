import { Injectable } from '@angular/core';

//service to share data from list page to detail page 

@Injectable({
    providedIn: 'root',
})
export class SharedDataService {
    private pokemonName: string = '';
    private pokemonType : string='';
    private pokemonNameKey = 'ab';
    private pokemonTypeKey = 'abc';

    constructor() {
        this.loadData();
    }

    setChosenPokemonName(pokemonName : string) : void{
        this.pokemonName= pokemonName;
        this.saveSharedData();
    }
    setPokemonType(pokemonType : string) : void{
        this.pokemonType = pokemonType;
        this.saveSharedData();
    }


    getChosenPokemonName(): string{
        return this.pokemonName;
    }
    getPokemonType(): string{
        return this.pokemonType;
    }
    clearData(): void {
        this.pokemonName = '';
        this.pokemonType ='';
        console.log("all cleared now :(");
        localStorage.removeItem(this.pokemonTypeKey);
        localStorage.removeItem(this.pokemonNameKey);
    }
    private saveSharedData(): void {
        console.log("saved ");
        localStorage.setItem(this.pokemonNameKey, JSON.stringify(this.pokemonName));
        localStorage.setItem(this.pokemonTypeKey, JSON.stringify(this.pokemonType));
    }
    private loadData(): void {
        const storedName = localStorage.getItem(this.pokemonNameKey);
        const storedType = localStorage.getItem(this.pokemonTypeKey);
        if (storedName&&storedType) {
            console.log("loaded")
        this.pokemonName =  JSON.parse(storedName);
        this.pokemonType = JSON.parse(storedType);
        }
    }
}