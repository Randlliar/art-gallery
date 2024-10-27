import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ArtType} from "@type/art.type";
import {ActiveParamsType} from "@type/active-param.type";

@Injectable({
  providedIn: 'root'
})

export class ArtService {
  constructor(private http: HttpClient) { }


  getArts(params: ActiveParamsType): Observable<ArtType[]> {
    const queryParams =  `?page=${params.page}`;
    return this.http.get<ArtType[]>(`${environment.api}${queryParams}`);
  }
  getSomeArts(ids: string): Observable<ArtType[]> {
    return this.http.get<ArtType[]>(`${environment.api}?ids=${ids}`);
  }

getArt(id: number): Observable<ArtType> {
    return this.http.get<ArtType>(`${environment.api}/${id}`)
}

  getSearchArts(params: ActiveParamsType): Observable<ArtType[]> {
    const isSearchMode = !!params?.query?.length;
    const requestEndpoint = `${isSearchMode ? '/search' : ''}`;
    const queryParams =  `?page=${params.page}${isSearchMode ? `&q=${params.query}` : ''}`;
    return this.http.get<ArtType[]>(`${environment.api}${requestEndpoint}${queryParams}`);
  }

}
