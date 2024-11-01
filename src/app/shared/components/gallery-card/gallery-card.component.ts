import {Component, input, Input, InputSignal} from '@angular/core';
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {ArtsType} from "@type/arts.type";
import {FavoritesService} from "@services/favorites.service";
import {SvgIconComponent} from "angular-svg-icon";

@Component({
  selector: 'app-gallery-card',
  standalone: true,
  templateUrl: './gallery-card.component.html',
  imports: [
    SlicePipe,
    NgIf,
    NgForOf,
    SvgIconComponent
  ],
  styleUrl: './gallery-card.component.scss'
})

export class GalleryCardComponent {

  art:InputSignal<any> = input<ArtsType>();


  constructor(private favoritesService: FavoritesService) {
  }



  addToFavorites(event: Event,item: ArtsType): void {
    event.stopPropagation();
    this.favoritesService.addFavorite(item);
  }

  removeFromFavorites(event: Event,itemId: number): void {
    event.stopPropagation();
    this.favoritesService.removeFromFavorites(itemId);
  }

  isFavorite(itemId: number): boolean {
    return this.favoritesService.isFavorite(itemId);
  }

}
