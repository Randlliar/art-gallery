import {Component, OnInit, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {debounceTime, distinctUntilChanged, tap} from "rxjs";
import {ActiveParamsType} from "@type/active-param.type";
import {ArtsWrapperType} from "@type/arts-wrapper.type";
import {ArtsType} from "@type/arts.type";
import {ArtService} from "@services/art.service";
import {SmallCardComponent} from "@components/small-card/small-card.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    SmallCardComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  searchControl:FormControl = new FormControl('');
  isLoading: boolean = false;
  private isSearch = signal(false);
  public activeParams: ActiveParamsType = {page: 1};
  private srt: string = '';
  public searchArts: ArtsType[] = [];
  public searchedArts: ArtsType[] = [];
  constructor(private artService: ArtService) {
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
        this.searchArts = data.data;
        console.log(this.searchArts)
        this.srt = data.data.flatMap((item: ArtsType) => item.id).join();
        this.getSomeArts(this.srt)
      })
  }

  private getSomeArts(ids: string) {
    this.artService.getSomeArts(ids)
      .subscribe((data: ArtsWrapperType) => {
        this.searchedArts = data.data;
      })
  }

}
