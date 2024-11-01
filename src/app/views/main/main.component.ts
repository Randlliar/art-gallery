import {Component, OnInit} from '@angular/core';
import {GalleryCardComponent} from "@components/gallery-card/gallery-card.component";
import {SmallCardComponent} from "@components/small-card/small-card.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ArtService} from "@services/art.service";
import {ActiveParamsType} from "@type/active-param.type";
import {debounceTime,} from "rxjs";
import {LoaderService} from "@services/loader.service";
import {ArtsType} from "@type/arts.type";
import {ArtsWrapperType} from "@type/arts-wrapper.type";
import {PaginationComponent} from "@components/pagination/pagination.component";
import {SearchComponent} from "@components/search/search.component";
import {SlicePipe} from "@angular/common";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    GalleryCardComponent,
    SmallCardComponent,
    PaginationComponent,
    SearchComponent,
    SlicePipe
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
   arts: ArtsType[] = [];
   activeParams: ActiveParamsType = {page: 1};
   sortDirection: 'asc' | 'desc' = 'asc';

  // artworks: ArtsType[] = [];

  constructor(private router: Router,
              private artService: ArtService,
              private activatedRoute: ActivatedRoute,
              private loaderService: LoaderService,
              ) {
  }


  ngOnInit() {
    this.processContent();
  }

  private processContent() {
    this.loaderService.show();
    this.activatedRoute.queryParams
      .pipe(
        debounceTime(500),
      )
      .subscribe(params => {
        if (params['page']) {
          this.activeParams.page = +params['page'];
        }
        this.getArts();
        this.loaderService.hide();
      })
  }

  private getArts() {
    this.loaderService.show();
    this.artService.getArts(this.activeParams)
      .subscribe((data: ArtsWrapperType) => {
        // this.amountOfPages = data.pagination.total_pages;
        this.arts = data.data;
        console.log(this.arts)
        this.loaderService.hide();
      })
  }



   sortArts() {
    this.artService.getArts(this.activeParams)
      .subscribe((data: ArtsWrapperType) => {
        console.log(data.data)
        this.arts = data.data.sort((a: ArtsType, b: ArtsType) => {
          if (this.sortDirection === 'asc') {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          } else {
            if (a.title < b.title) return 1;
            if (a.title > b.title) return -1;
            return 0;
          }
        })
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
      })
  }


   getMore(id: number) {
    this.router.navigate([`/details/${id}`], {
      queryParams: null
    });
  }



}
