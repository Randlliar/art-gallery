import { Component, OnInit } from '@angular/core';
import { ArtsType } from '@type/arts.type';
import { ArtService } from '@services/art.service';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '@services/favorites.service';
import {LoaderService} from "@services/loader.service";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  art!: ArtsType;
  constructor(
    private artService: ArtService,
    private route: ActivatedRoute,
    private favoritesService: FavoritesService,
    private loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.loaderService.show();
    this.route.params.subscribe((event) => {
      this.artService.getArt(+event['id']).subscribe((item: any) => {
        this.art = item.data;
        this.loaderService.hide();
      });
    });
  }

  isFavorite(item: ArtsType): boolean {
    console.log(this.favoritesService.isFavorite(item.id));
    return this.favoritesService.isFavorite(item.id);
  }
  toggleFavorite(event: Event, item: ArtsType): void {
    event.stopPropagation();
    this.favoritesService.toggleFavorite(item);
  }
}
