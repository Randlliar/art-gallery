import { Component, input, InputSignal, OnDestroy, OnInit } from '@angular/core';
import { ArtsType } from '@type/arts.type';
import { FavoritesService } from '@services/favorites.service';
import { NgOptimizedImage, SlicePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, Subscription, throwError } from 'rxjs';
import { log } from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

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
    private http: HttpClient,
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
    // this.http.get(this.url)
    //   .subscribe((response): string => {
    //       if (response) {
    //
    //         // console.log(`Успешный ответ: ${this.url}`);
    //         return this.url;
    //       } else {
    //         // console.log(response)
    //         return this.url = '/assets/images/modsen.png'
    //       }
    //     }, error => {
    //      this.url = '/assets/images/modsen.png';
    //       // console.log(`Ошибка запроса: ${error.status} ${error.message}`);
    //     },
    //   );
  }
}
