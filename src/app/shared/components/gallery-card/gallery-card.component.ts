import { Component, input, InputSignal, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { ArtsType } from '@type/arts.type';
import { FavoritesService } from '@services/favorites.service';
@Component({
  selector: 'app-gallery-card',
  standalone: true,
  templateUrl: './gallery-card.component.html',
  imports: [SlicePipe ],
  styleUrl: './gallery-card.component.scss',
})
export class GalleryCardComponent implements OnInit {
  art: InputSignal<any> = input<ArtsType>();
  isInFavorite: boolean = false;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.isInFavorite = this.favoritesService.isFavorite(this.art().id);
  }

  toggleFavorite(event: Event, item: ArtsType): void {
    event.stopPropagation();
    this.isInFavorite = !this.isInFavorite;
    this.favoritesService.toggleFavorite(item);
  }
}
