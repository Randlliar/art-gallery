import {Component, OnInit} from '@angular/core';
import {ActiveParamsType} from "@type/active-param.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ArtsWrapperType} from "@type/arts-wrapper.type";
import {ArtService} from "@services/art.service";
import {debounceTime} from "rxjs";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-pagination',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit{
  public amountOfPages!: number;
  public activeParams: ActiveParamsType = {page: 1};

  constructor(private router: Router,
              private artService: ArtService,
              private activatedRoute: ActivatedRoute,) {
  }
  ngOnInit(): void {
    this.processContent();
  }

   openPage(page: number): void {
    this.activeParams.page = page;
    this.router.navigate([''], {
      queryParams: this.activeParams
    });
  }

   openNextPage(): void {
    if (this.activeParams.page && this.activeParams.page < this.amountOfPages) {
      this.activeParams.page++;
      this.router.navigate([''], {
        queryParams: this.activeParams
      });
    }
  }

   openPrevPage(): void {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.activeParams.page--;
      this.router.navigate([''], {
        queryParams: this.activeParams
      });
    }
  }

  private processContent(): void {
    this.activatedRoute.queryParams
      .pipe(
        debounceTime(500),
      )
      .subscribe(params => {
        if (params['page']) {
          this.activeParams.page = +params['page'];
        }
        this.getArts();
      })
  }

  private getArts(): void {
    this.artService.getArts(this.activeParams)
      .subscribe((data: ArtsWrapperType) => {
        this.amountOfPages = data.pagination.total_pages;
      })
  }
}
