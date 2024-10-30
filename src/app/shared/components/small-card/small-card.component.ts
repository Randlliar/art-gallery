import {Component, Input} from '@angular/core';
import {NgForOf, NgIf, SlicePipe,} from "@angular/common";
import {ArtsType} from "@type/arts.type";
import {FavoritesService} from "@services/favorites.service";

@Component({
  selector: 'small-card',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SlicePipe,
  ],
  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.scss'
})
export class SmallCardComponent{

  @Input() art!: ArtsType
  @Input() arts!: ArtsType[]

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
