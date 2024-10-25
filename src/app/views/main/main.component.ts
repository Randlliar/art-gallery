import {Component, Input, OnInit} from '@angular/core';
import {GalleryCardComponent} from "@components/gallery-card/gallery-card.component";
import {SmallCardComponent} from "@components/small-card/small-card.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ArtService} from "@services/art.service";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {ActiveParamsType} from "@type/active-param.type";
import {debounceTime} from "rxjs";
import {LoaderService} from "@services/loader.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
  filteredArts: ArtType[] = [];

  pages: number[] = []
  activeParams: ActiveParamsType = {page: 1};

  constructor(private router: Router,
              private artService: ArtService,
              private activatedRoute: ActivatedRoute,
              private loaderService: LoaderService) {
  }


  ngOnInit() {
    this.subscribeToArtChanges();
    this.processContent();
  }

 private subscribeToArtChanges() {
    this.artService.getArts(this.activeParams.page)
      .subscribe((item: any) => {
       this.processContent();
      });
  }

  private processContent() {
    this.loaderService.show();
    this.activatedRoute.queryParams
      .pipe(
        debounceTime(500)
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

        this.pages = []
        this.arts = data.data;
        for (let i = 1; i <= data.pagination.total_pages; i++) {
          this.pages.push(i);
        }
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
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
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


}
