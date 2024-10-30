import {Component, Input} from '@angular/core';
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {ArtsType} from "@type/arts.type";
import {FavoritesService} from "@services/favorites.service";

@Component({
  selector: 'gallery-card',
  standalone: true,
  templateUrl: './gallery-card.component.html',
  imports: [
    SlicePipe,
    NgIf,
    NgForOf
  ],
  styleUrl: './gallery-card.component.scss'
})

export class GalleryCardComponent {

  @Input() art!: ArtsType;

  constructor(private favoritesService: FavoritesService) {}



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
