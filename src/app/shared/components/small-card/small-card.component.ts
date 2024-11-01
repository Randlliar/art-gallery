import {Component, input, InputSignal} from '@angular/core';
import {ArtsType} from "@type/arts.type";
import {FavoritesService} from "@services/favorites.service";
import {SlicePipe} from "@angular/common";

@Component({
  selector: 'app-small-card',
  standalone: true,
  imports: [
    SlicePipe
  ],
  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.scss'
})
export class SmallCardComponent {

  art:InputSignal<any> = input<ArtsType>();
  constructor(private favoritesService: FavoritesService) {
  }


  addToFavorites(event: Event,item: ArtsType): void {
    event.stopPropagation();
    this.favoritesService.addFavorite(item);
  }

  removeFromFavorites(event: Event,itemId: number): void {
    event.stopPropagation();
    if (itemId) {
      this.favoritesService.removeFromFavorites(itemId);
    }
  }

  isFavorite(itemId: number): boolean {
      return this.favoritesService.isFavorite(itemId);
  }

}
