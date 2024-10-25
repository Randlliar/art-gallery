import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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

}
