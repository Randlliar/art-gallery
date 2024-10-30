import { Routes } from '@angular/router';
import {LayoutComponent} from "./shared/layout/layout.component";
import {MainComponent} from "./views/main/main.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: MainComponent},
      {path: 'details/:id', loadComponent: () => import('./views/art/details/details.component').then(c => c.DetailsComponent)},
      {path: 'favorites', loadComponent: () => import('./views/art/favorites/favorites.component').then(c => c.FavoritesComponent)},
    ]
  }
];
