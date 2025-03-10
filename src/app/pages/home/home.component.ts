import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { GifApiService } from '../../shared/services/gif-api.service';
import { debounceTime, filter, finalize, map, Observable, switchMap, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GifAdapter } from '../../shared/utils/gif.adapter';
import { GifPreviewAdapted } from '../../shared/models/gif.model';
import { GifGalleryComponent } from './components/gif-gallery/gif-gallery.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AsyncPipe } from '@angular/common';
import { LoadingStatus } from '../../shared/models/loader.model';

@Component({
  selector: 'app-home',
  imports: [
    SearchBarComponent,
    ReactiveFormsModule,
    GifGalleryComponent,
    ButtonComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly fb = inject(NonNullableFormBuilder);

  private readonly gifApiService = inject(GifApiService);

  private readonly destroyRef = inject(DestroyRef);

  public form = this.fb.group({
    searchValue: ['', [Validators.required, Validators.minLength(1)]],
  });

  public autocompleteSuggestions = this.observeSearchCtrlChanges();

  public gifs = signal<GifPreviewAdapted[]>([]);

  public masonryConfig = {
    gutter: 12,
  };

  private paginationState = signal({
    offset: 0,
    limit: 30,
    totalCount: 0,
    query: '',
  });

  public loadingStatus = signal<LoadingStatus>(LoadingStatus.idle);

  public updateMasonryLayout = signal<boolean>(false);

  ngOnInit() {
    this.observeSearchCtrlChanges();
    this.getTrendingGifs();
  }

  get searchCtrl(): FormControl {
    return this.form.get('searchValue') as FormControl;
  }

  private observeSearchCtrlChanges(): Observable<{ name: string }[]> {
    return this.searchCtrl.valueChanges.pipe(
      debounceTime(300),
      filter((value) => value.trim().length > 0),
      tap(() => this.loadingStatus.set(LoadingStatus.pending)),
      switchMap((value) => this.gifApiService.getGifAutocompleteOptions(value)),
      map((res) => res.data || []),
      finalize(() => this.loadingStatus.set(LoadingStatus.finished)),
      takeUntilDestroyed(this.destroyRef),
    );
  }

  private getTrendingGifs(): void {
    this.gifApiService
      .getTrendingGifs(this.paginationState())
      .pipe(
        map((res) => res.data.map((gif) => new GifAdapter(gif).getPreviewData())),
        tap((gifs: GifPreviewAdapted[]) => {
          this.gifs.set(gifs);
        }),
        finalize(() => this.loadingStatus.set(LoadingStatus.finished)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
  }

  public searchGifs(): void {
    this.loadingStatus.set(LoadingStatus.pending);
    const query = this.searchCtrl.value.trim();

    if (this.paginationState().query !== query) {
      this.paginationState.update((state) => ({ ...state, offset: 0, limit: 30, totalCount: 0 }));
      this.gifs.set([]);
      this.updateMasonryLayout.set(true);
    }

    this.paginationState.update((state) => ({ ...state, query }));

    if (query.length) {
      this.gifApiService
        .searchGif(query, this.paginationState())
        .pipe(
          take(1),
          tap(
            (res) =>
              res.pagination &&
              this.paginationState.update((state) => ({
                ...state,
                totalCount: res.pagination!.total_count,
              })),
          ),
          map((res) => res.data.map((gif) => new GifAdapter(gif).getPreviewData())),
          tap((gifs: GifPreviewAdapted[]) => {
            this.gifs.update((prevState) => [...prevState, ...gifs]);
          }),
          finalize(() => this.loadingStatus.set(LoadingStatus.finished)),
        )
        .subscribe();
    }
  }

  public updatePaginationParams(): void {
    const { offset, limit, totalCount } = this.paginationState();
    const nextOffset = offset + limit;
    if (nextOffset < totalCount && this.searchCtrl.value) {
      this.paginationState.update((state) => ({
        ...state,
        offset: nextOffset,
      }));
      this.searchGifs();
    } else {
      return;
    }
  }
}
