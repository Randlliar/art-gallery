import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {ArtType} from "@type/art.type";
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

export class GalleryCardComponent implements OnInit {

  @Input() art!: ArtType;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
  }

  addToFavorites(event: Event,item: any): void {
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
