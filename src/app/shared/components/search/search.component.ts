import {
  Component,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { ActiveParamsType } from '@type/active-param.type';
import { ArtsWrapperType } from '@type/arts-wrapper.type';
import { ArtsType } from '@type/arts.type';
import { ArtService } from '@services/art.service';
import { SmallCardComponent } from '@components/small-card/small-card.component';
import { SlicePipe } from '@angular/common';
import { Router } from '@angular/router';
import { specialCharactersOnlyValidator } from 'src/app/shared/validators/special-characters-validator';
import {LoaderService} from "@services/loader.service";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, SmallCardComponent, SlicePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  searchControl: FormControl = new FormControl('', [
    specialCharactersOnlyValidator(),
  ]);
  isLoading: boolean = false;
  activeParams: ActiveParamsType = { page: 1 };
  searchArts: ArtsType[] = [];
  art: InputSignal<ArtsType | undefined> = input<ArtsType>();
  isSearch = signal(false);
  private srt: string = '';
  private destroy$:Subject<void> = new Subject<void>();

  constructor(
    private artService: ArtService,
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.handleSearchInput();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getSearchArts(): void {
    this.loaderService.show();
    this.artService
      .getSearchArts(this.activeParams)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ArtsWrapperType): void => {
        this.srt = data.data.flatMap((item: ArtsType) => item.id).join();
        this.getSomeArts(this.srt);
        this.loaderService.hide();
      });
  }

  getSomeArts(ids: string): void {
    this.loaderService.show();
    this.artService
      .getSomeArts(ids)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ArtsWrapperType): void => {
        this.searchArts = data.data;
        this.loaderService.hide();
      });
  }

  getMore(id: number): void {
    this.router.navigate([`/details/${id}`], {
      queryParams: null,
    });
  }

  private handleSearchInput(): void {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        distinctUntilChanged(),
        tap((query) => {
          if (query?.length) {
            this.isSearch.set(true);
          } else if (!query?.length) {
            this.isSearch.set(false);
          }

          this.isLoading = true;
          this.activeParams.page = 1;
          this.activeParams.query = query ?? '';
          this.getSearchArts();
        }),
      )
      .subscribe();
  }
}
