import {
  Component,
  input,
  InputSignal,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil, tap } from 'rxjs';
import { ActiveParamsType } from '@type/active-param.type';
import { ArtsWrapperType } from '@type/arts-wrapper.type';
import { ArtsType } from '@type/arts.type';
import { ArtService } from '@services/art.service';
import { SmallCardComponent } from '@components/small-card/small-card.component';
import { SlicePipe } from '@angular/common';
import { Router } from '@angular/router';
import { specialCharactersOnlyValidator } from 'src/app/shared/validators/special-characters-validator';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, SmallCardComponent, SlicePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnDestroy {
  formGroup!: FormGroup;
  searchControl: FormControl = new FormControl('', [
    Validators.required,
    specialCharactersOnlyValidator(),
  ]);
  isLoading: boolean = false;
  activeParams: ActiveParamsType = { page: 1 };
  searchArts: ArtsType[] = [];
  art: InputSignal<any> = input<ArtsType>();

  private srt: string = '';
  private isSearch: WritableSignal<boolean> = signal(false);
  private destroy$ = new Subject<void>();

  constructor(
    private artService: ArtService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.handleSearchInput();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
          } else {
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

  private getSearchArts(): void {
    this.artService
      .getSearchArts(this.activeParams)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ArtsWrapperType): void => {
        this.srt = data.data.flatMap((item: ArtsType) => item.id).join();
        this.getSomeArts(this.srt);
      });
  }

  private getSomeArts(ids: string): void {
    this.artService
      .getSomeArts(ids)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ArtsWrapperType): void => {
        this.searchArts = data.data;
      });
  }

  getMore(id: number): void {
    this.router.navigate([`/details/${id}`], {
      queryParams: null,
    });
  }
}
