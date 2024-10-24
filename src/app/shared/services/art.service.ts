import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ArtType} from "../../types/art";
import {ActiveParamsType} from "../../types/active-param.type";

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
