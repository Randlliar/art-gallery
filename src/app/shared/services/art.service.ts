import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ActiveParamsType} from "@type/active-param.type";
import {ArtType} from "@type/art.type";
import {ArtsWrapperType} from "@type/arts-wrapper.type";

@Injectable({
  providedIn: 'root'
})

export class ArtService {
  constructor(private http: HttpClient) { }


  getArts(params: ActiveParamsType): Observable<ArtsWrapperType> {
    const queryParams =  `?page=${params.page}`;
    return this.http.get<ArtsWrapperType>(`${environment.api}${queryParams}`);
  }
  getSomeArts(ids: string): Observable<ArtsWrapperType> {
    return this.http.get<ArtsWrapperType>(`${environment.api}?ids=${ids}`);
  }

getArt(id: number): Observable<ArtType > {
    return this.http.get<ArtType >(`${environment.api}/${id}`)
}

  getSearchArts(params: ActiveParamsType): Observable<ArtsWrapperType> {
    const isSearchMode = !!params?.query?.length;
    const requestEndpoint = `${isSearchMode ? '/search' : ''}`;
    const queryParams =  `?page=${params.page}${isSearchMode ? `&q=${params.query}` : ''}`;
    return this.http.get<ArtsWrapperType>(`${environment.api}${requestEndpoint}${queryParams}`);
  }

}
