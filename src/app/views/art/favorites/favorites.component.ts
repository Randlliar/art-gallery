import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ArtsType} from "@type/arts.type";
import {SmallCardComponent} from "@components/small-card/small-card.component";
import {FavoritesService} from "@services/favorites.service";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    SmallCardComponent,
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit{
  arts: ArtsType[] = [];
  constructor(private router: Router,
              private favoritesService: FavoritesService) {
  }

  ngOnInit() {
    this.getFavorites();
  }

  getFavorites() {
   this.arts = this.favoritesService.getFavorites();
}

  public getMore(id: number) {
    this.router.navigate([`/details/${id}`], {
      queryParams: null
    });
  }

}
