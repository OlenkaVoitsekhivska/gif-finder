import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { GenericResponse } from '../models/api-response.model';
import { AutocompleteOption, Gif } from '../models/gif.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GifApiService {
  private readonly http = inject(HttpClient);

  public getGifAutocompleteOptions(
    query: string,
  ): Observable<GenericResponse<AutocompleteOption[]>> {
    const url = 'http://api.giphy.com/v1/gifs/search/tags';
    return this.http
      .get<GenericResponse<AutocompleteOption[]>>(url, {
        params: {
          api_key: environment.API_KEY,
          q: query,
        },
      })
      .pipe(catchError((err) => of(err.error)));
  }

  public searchGif(
    query: string,
    paginationParams: { offset: number; limit: number },
  ): Observable<GenericResponse<Gif[]>> {
    const url = 'http://api.giphy.com/v1/gifs/search';

    return this.http
      .get<GenericResponse<Gif[]>>(url, {
        params: {
          api_key: environment.API_KEY,
          q: query,
          limit: paginationParams.limit,
          offset: paginationParams.offset,
        },
      })
      .pipe(catchError((err) => of(err.error)));
  }

  public getTrendingGifs(paginationParams: {
    offset: number;
    limit: number;
  }): Observable<GenericResponse<Gif[]>> {
    const url = 'http://api.giphy.com/v1/gifs/trending';

    return this.http
      .get<GenericResponse<Gif[]>>(url, {
        params: {
          api_key: environment.API_KEY,
          limit: paginationParams.limit,
          offset: paginationParams.offset,
        },
      })
      .pipe(catchError((err) => of(err.error)));
  }

  public getGifById(id: string): Observable<GenericResponse<Gif[]>> {
    const url = 'http://api.giphy.com/v1/gifs';

    return this.http
      .get<GenericResponse<Gif[]>>(url, {
        params: {
          api_key: environment.API_KEY,
          gif_id: id,
          ids: [id],
        },
      })
      .pipe(catchError((err) => of(err.error)));
  }
}
