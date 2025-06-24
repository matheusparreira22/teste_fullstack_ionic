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
          import('../pokemon-detail/pokemon-detail.page').then(
            (m) => m.PokemonDetailPage
          ),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('../favorites/favorites.page').then((m) => m.FavoritesPage),
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
