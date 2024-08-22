import { NgModule } from '@angular/core';
import { provideRouter, RouterModule, Routes, withComponentInputBinding } from '@angular/router';
import { NavigateToPokemonList } from '@core/components/home/homePage.component';
import { PokemonList } from '@core/components/pokemonList/pokemonList.component';
import { LoginPageComponent } from '@modules/login/components/login-page/login-page.component';
import { LoginModule } from '@modules/login/login.module';
import { PokemonDetail } from '@core/components/pokemonDetail/pokemonDetail.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: NavigateToPokemonList,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  //add routes to new page 
  {
    path: 'pokemonList',
    component: PokemonList,
  },
  {
    path: 'pokemonDetail',
    component: PokemonDetail,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LoginModule],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())],
})
export class AppRoutingModule {}
