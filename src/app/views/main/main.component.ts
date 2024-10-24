import {Component, Input, OnInit} from '@angular/core';
import {GalleryCardComponent} from "../../shared/components/gallery-card/gallery-card.component";
import {SmallCardComponent} from "../../shared/components/small-card/small-card.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ArtService} from "../../shared/services/art.service";
import {NgForOf, SlicePipe} from "@angular/common";
import {ArtType} from "../../types/art";
import {ActiveParamsType} from "../../types/active-param.type";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    GalleryCardComponent,
    SmallCardComponent,
    NgForOf,
    SlicePipe
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  arts: ArtType[] = [];
  pages: number[] = []
  activeParams: ActiveParamsType = {page: 1};

  constructor(private router: Router,
              private artService: ArtService,
              private activatedRoute: ActivatedRoute,) {
  }


  ngOnInit() {
    this.subscribeToArtChanges();
    this.processContent();
  }

  subscribeToArtChanges() {
    this.artService.getArts(this.activeParams.page)
      .subscribe((item: any) => {
       this.processContent()
      })
  }

  processContent() {
    this.activatedRoute.queryParams
      .pipe(
        debounceTime(500)
      )
      .subscribe(params => {
        if (params['page']) {
          this.activeParams.page = +params['page'];
        }
        this.getArts();
      })
  }

  getArts() {
    this.artService.getArts(this.activeParams.page)
      .subscribe((data: any) => {
        this.pages = []
        this.arts = data.data;
        for (let i = 1; i <= data.pagination.total_pages; i++) {
          this.pages.push(i);
        }
      })
  }
  openPage(page: number) {
    this.activeParams.page = page;
    this.router.navigate([''], {
      queryParams: this.activeParams
    });
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate([''], {
        queryParams: this.activeParams
      });
    }
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate([''], {
        queryParams: this.activeParams
      });
    }
  }

  getMore(id: number) {
        this.router.navigate([`/details/${id}`], {
          queryParams: null
        });

  }


}
