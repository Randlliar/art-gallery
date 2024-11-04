import { Component, input, InputSignal, OnInit } from '@angular/core';
import { ArtsType } from '@type/arts.type';
import { FavoritesService } from '@services/favorites.service';
import { NgOptimizedImage, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-small-card',
  standalone: true,
  imports: [SlicePipe, NgOptimizedImage],
  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.scss',
})
export class SmallCardComponent implements OnInit {
  art: InputSignal<any> = input<ArtsType>();
  url: string = '';
  isInFavorite: boolean = false;

  constructor(
    private favoritesService: FavoritesService,
  ) {}

  ngOnInit(): void {
    this.getImage(this.art().image_id);
    this.isInFavorite = this.favoritesService.isFavorite(this.art().id);
  }

  toggleFavorite(event: Event, item: ArtsType): void {
    event.stopPropagation();
    this.isInFavorite = !this.isInFavorite;
    this.favoritesService.toggleFavorite(item);
  }

  getImage(id: string): string {
    this.url = `https://www.artic.edu/iiif/2/${id}/full/800,/0/default.jpg`;
    return this.url;
  }
}
