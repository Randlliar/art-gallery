import { Routes } from '@angular/router';
import {LayoutComponent} from "./shared/layout/layout.component";
import {MainComponent} from "./views/main/main.component";
import {DetailsComponent} from "./views/art/details/details.component";
import {FavoritesComponent} from "./views/art/favorites/favorites.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: '', component: MainComponent},
      {path: 'details/:id', component: DetailsComponent},
      {path: 'favorites', component: FavoritesComponent},
    ]
  }
];
