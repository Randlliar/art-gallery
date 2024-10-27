import {Component, OnInit} from '@angular/core';
import {GalleryCardComponent} from "@components/gallery-card/gallery-card.component";
import {SmallCardComponent} from "@components/small-card/small-card.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ArtService} from "@services/art.service";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {ActiveParamsType} from "@type/active-param.type";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs";
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
  amountOfPages!: number;

  activeParams: ActiveParamsType = {page: 1};

  searchControl = new FormControl('');
  artworks: ArtType[] = [];
  isLoading: boolean = false;

  constructor(private router: Router,
              private artService: ArtService,
              private activatedRoute: ActivatedRoute,
              private loaderService: LoaderService) {
  }


  ngOnInit() {
    this.subscribeToArtChanges();
    this.processContent();

    this.searchControl.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(query => {
          this.isLoading = true;
          return this.artService.searchArtworks(query!);
        })
      )
      .subscribe(
        (response) => {
          this.artworks = response.data;  // Сохраняем данные из API
          this.isLoading = false;
        },
        (error) => {
          console.error('Ошибка при получении данных:', error);
          this.isLoading = false;
        }
      );
  }

  private subscribeToArtChanges() {
    this.artService.getArts(this.activeParams.page)
      .subscribe(() => this.processContent());
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
    this.artService.getArts(this.activeParams.page)
      .subscribe((data: any) => {
        this.loaderService.show();

        this.amountOfPages = data.pagination.total_pages;
        this.arts = data.data;

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


  getSearch() {

  }

}
