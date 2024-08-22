import { Router } from '@angular/router';
import { Component } from '@angular/core';
@Component({
    standalone: true,
    selector: 'app-navigate',
    imports:[],
    templateUrl:'./homePage.component.html',
    styleUrls: ['./homePage.component.scss'],
})
export class NavigateToPokemonList {
  constructor(private router: Router) { }

  NavigateToPokemonList() {
    console.log("click work ! ")
    this.router.navigate(['/pokemonList']);
  }
}



