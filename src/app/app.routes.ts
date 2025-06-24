import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/pokelist',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then((m) => m.TabsPage),
    children: [
      {
        path: 'pokelist',
        loadComponent: () => import('./tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'favorites',
        loadComponent: () =>
          import('./favorites/favorites.page').then((m) => m.FavoritesPage),
      },
      {
        path: 'pokemon/:id',
        loadComponent: () =>
          import('./pokemon-detail/pokemon-detail.page').then(
            (m) => m.PokemonDetailPage
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/pokelist',
        pathMatch: 'full',
      },
    ],
  },
];
