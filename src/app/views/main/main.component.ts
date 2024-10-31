import {Component, OnInit, signal} from '@angular/core';
import {GalleryCardComponent} from "@components/gallery-card/gallery-card.component";
import {SmallCardComponent} from "@components/small-card/small-card.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ArtService} from "@services/art.service";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {ActiveParamsType} from "@type/active-param.type";
import {debounceTime, distinctUntilChanged, tap} from "rxjs";
import {LoaderService} from "@services/loader.service";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ArtsType} from "@type/arts.type";
import {ArtsWrapperType} from "@type/arts-wrapper.type";
import {PaginationComponent} from "@components/pagination/pagination.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    GalleryCardComponent,
    SmallCardComponent,
    NgForOf,
    SlicePipe,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    PaginationComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  public arts: ArtsType[] = [];
  private srt: string = '';
  public searchArts: ArtsType[] = [];
  public amountOfPages!: number;
  public sortingOpen = false;

  public activeParams: ActiveParamsType = {page: 1};
  public sortDirection: 'asc' | 'desc' = 'asc';
  public searchControl = new FormControl('');
  private isSearch = signal(false);


  artworks: ArtsType[] = [];
  isLoading: boolean = false;

  constructor(private router: Router,
              private artService: ArtService,
              private activatedRoute: ActivatedRoute,
              private loaderService: LoaderService) {
  }


  ngOnInit() {
    this.processContent();
    this.handleSearchInput();
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
        this.loaderService.hide();
      })
  }


  private getSomeArts(ids: string) {
    this.artService.getSomeArts(ids)
      .subscribe((data: ArtsWrapperType) => this.arts = data.data)
  }

  public sortArts() {
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

  private getSearchArts() {
    this.loaderService.show();
    this.artService.getSearchArts(this.activeParams)
      .subscribe((data: ArtsWrapperType) => {
        this.searchArts = data.data;
        this.srt = data.data.flatMap((item: ArtsType) => item.id).join();
        this.getSomeArts(this.srt)
        this.loaderService.hide();
      })
  }

  public getMore(id: number) {
    this.router.navigate([`/details/${id}`], {
      queryParams: null
    });
  }


  private handleSearchInput(): void {
    this.searchControl.valueChanges
      .pipe(
        // Add unsubscription pipe
        debounceTime(500),
        distinctUntilChanged(),
        tap((query) => {
          if (query?.length) {
            this.isSearch.set(true);
          } else {
            this.isSearch.set(false);
          }

          this.isLoading = true;
          this.activeParams.page = 1;
          this.activeParams.query = query ?? '';
          this.getSearchArts();

        }),
      ).subscribe();
  }

}
