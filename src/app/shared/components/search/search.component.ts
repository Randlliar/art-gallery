import {Component, Input, input, InputSignal, OnInit, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, distinctUntilChanged, tap} from "rxjs";
import {ActiveParamsType} from "@type/active-param.type";
import {ArtsWrapperType} from "@type/arts-wrapper.type";
import {ArtsType} from "@type/arts.type";
import {ArtService} from "@services/art.service";
import {SmallCardComponent} from "@components/small-card/small-card.component";
import {SlicePipe} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SmallCardComponent,
    SlicePipe
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  searchControl: FormControl = new FormControl('', Validators.required);
  isLoading: boolean = false;
  activeParams: ActiveParamsType = {page: 1};
  searchArts: ArtsType[] = [];
  private srt: string = '';
  art:InputSignal<any> = input<ArtsType>();
  private isSearch = signal(false);

  constructor(private artService: ArtService,
              private router: Router) {
  }

  ngOnInit() {
    this.handleSearchInput()
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

  private getSearchArts() {
    this.artService.getSearchArts(this.activeParams)
      .subscribe((data: ArtsWrapperType) => {
        this.srt = data.data.flatMap((item: ArtsType) => item.id).join();
        this.getSomeArts(this.srt)
      })
  }

  private getSomeArts(ids: string) {
    this.artService.getSomeArts(ids)
      .subscribe((data: ArtsWrapperType) => {
        this.searchArts = data.data;
      })
  }

  getMore(id: number) {
    this.router.navigate([`/details/${id}`], {
      queryParams: null
    });
  }
}
