import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForOf, NgIf, SlicePipe,} from "@angular/common";
import {ArtType} from "../../../types/art";
import {FavoritesService} from "../../services/favorites.service";

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
export class SmallCardComponent implements OnInit{

  @Input() art!: ArtType
  @Input() arts!: ArtType[]

  constructor(private favoritesService: FavoritesService) {
  }

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
