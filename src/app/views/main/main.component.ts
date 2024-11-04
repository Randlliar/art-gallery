import { Component, OnDestroy, OnInit } from '@angular/core';
import { GalleryCardComponent } from '@components/gallery-card/gallery-card.component';
import { SmallCardComponent } from '@components/small-card/small-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtService } from '@services/art.service';
import { ActiveParamsType } from '@type/active-param.type';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { LoaderService } from '@services/loader.service';
import { ArtsType } from '@type/arts.type';
import { ArtsWrapperType } from '@type/arts-wrapper.type';
import { PaginationComponent } from '@components/pagination/pagination.component';
import { SearchComponent } from '@components/search/search.component';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    GalleryCardComponent,
    SmallCardComponent,
    PaginationComponent,
    SearchComponent,
    SlicePipe,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit, OnDestroy {
  arts: ArtsType[] = [];
  activeParams: ActiveParamsType = { page: 1 };
  sortDirection: 'asc' | 'desc' = 'asc';
  sortCriteria: 'title' | 'date' = 'title';
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private artService: ArtService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.processContent();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

   processContent(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$),debounceTime(500))
      .subscribe((params) => {
      if (params['page']) {
        this.activeParams.page = +params['page'];
      }
      this.getArts();
    });
  }

  getArts(): void {
    this.loaderService.show();
    this.artService.getArts(this.activeParams)
      .subscribe((data: ArtsWrapperType) => {
      this.arts = data.data;
      this.loaderService.hide();
    });
  }

  sortArts(sortBy: 'title' | 'date'): void {
    this.loaderService.show();
    this.sortCriteria = sortBy;
    this.artService
      .getArts(this.activeParams)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ArtsWrapperType) => {
        this.arts = data.data.sort((a: any, b: any) => {
          let valueA;
          let valueB;

          if (sortBy === 'title') {
            valueA = a.title.toLowerCase();
            valueB = b.title.toLowerCase();
          } else if (sortBy === 'date') {
            valueA = a.source_updated_at;
            valueB = b.source_updated_at;
          }

          if (this.sortDirection === 'asc') {
            return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
          } else {
            return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
          }
        });
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        this.loaderService.hide();
      });

  }

  getMore(id: number): void {
    this.router.navigate([`/details/${id}`], {
      queryParams: null,
    });
  }
}
