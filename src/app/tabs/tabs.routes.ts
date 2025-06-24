import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'pokemons',
    component: TabsPage,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'pokemon/:id',
        loadComponent: () =>
          import('../pokemon-detail/pokemon-detail.page').then((m) => m.PokemonDetailComponent),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: '',
        redirectTo: '/pokemons',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/pokemons',
    pathMatch: 'full',
  },
];
