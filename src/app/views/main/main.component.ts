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
import {ArtType} from "@type/art.type";

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
    ReactiveFormsModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  arts: ArtType[] = [];
  srt: string = '';
  searchArts: ArtType[] = [];
  amountOfPages!: number;

  activeParams: ActiveParamsType = {page: 1};

  searchControl = new FormControl('');
  isSearch = signal(false);

  artworks: ArtType[] = [];
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
      .subscribe((data: any) => {
        this.amountOfPages = data.pagination.total_pages;
        this.arts = data.data;
        this.loaderService.hide();
      })
  }


  private getSomeArts(ids: string) {
    this.artService.getSomeArts(ids)
      .subscribe((data: any) => this.arts = data.data)
  }

  private getSearchArts() {
    this.loaderService.show();
    this.artService.getSearchArts(this.activeParams)
      .subscribe((data: any) => {
        this.searchArts = data.data;
        this.srt = data.data.flatMap((item: ArtType) => item.id).join();
        this.getSomeArts(this.srt)
        this.loaderService.hide();
      })
  }

  public openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate([''], {
      queryParams: this.activeParams
    });

  }

  public openNextPage() {
    this.loaderService.show();
    if (this.activeParams.page && this.activeParams.page < this.amountOfPages) {
      this.activeParams.page++;
      this.router.navigate([''], {
        queryParams: this.activeParams
      });
      this.loaderService.hide();
    }
  }

  public openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate([''], {
        queryParams: this.activeParams
      });
    }
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
