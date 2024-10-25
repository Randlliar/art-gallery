import {Component, OnInit} from '@angular/core';
import {NgForOf, SlicePipe} from "@angular/common";
import {SmallCardComponent} from "../../../shared/components/small-card/small-card.component";
import {ArtType} from "../../../types/art";
import {FavoritesService} from "../../../shared/services/favorites.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    NgForOf,
    SlicePipe,
    SmallCardComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit{
  arts: ArtType[] = [];
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
