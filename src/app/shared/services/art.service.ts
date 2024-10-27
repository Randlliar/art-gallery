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
    return this.http.get<ArtType[]>(`${environment.api}?page=${params}`, {
      params: params
    })
  }

getArt(id: number): Observable<ArtType> {
    return this.http.get<ArtType>(`${environment.api}/${id}`)
}

  searchArtworks(query: string): Observable<any> {
    // Создаем URL для поиска по полям
    const url = `${environment.api}?fields=id,title,artist_display,date_display,main_reference_number&q=${query}`;
    return this.http.get(url);
  }
}
