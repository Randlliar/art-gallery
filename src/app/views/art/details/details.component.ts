import {Component, OnInit} from '@angular/core';
import {ArtsType} from "@type/arts.type";
import {ArtService} from "@services/art.service";
import {ActivatedRoute} from "@angular/router";
import {FavoritesService} from "@services/favorites.service";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  art!: ArtsType;

  constructor(private artService: ArtService,
              private route: ActivatedRoute,
              private favoritesService: FavoritesService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe(event => {
      this.artService.getArt(+event['id'])
        .subscribe((item: any ) => {
            this.art = item.data;
        })
    });
  }


  addToFavorites(event: Event, item: ArtsType): void {
    event.stopPropagation();
    this.favoritesService.addFavorite(item);
  }

  removeFromFavorites(event: Event, itemId: number): void {
    event.stopPropagation();
    this.favoritesService.removeFromFavorites(itemId);
  }

  isFavorite(itemId: number): boolean {
    return this.favoritesService.isFavorite(itemId);
  }


}
