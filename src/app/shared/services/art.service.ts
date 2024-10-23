import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ArtType} from "../../types/art";

@Injectable({
  providedIn: 'root'
})

export class ArtService {
  constructor(private http: HttpClient) { }

  getArts(page: number, limit: number): Observable<ArtType> {
    return this.http.get<ArtType>(environment.api + `?page=${page}&limit=${limit}`)
  }

  getArt(id: number): Observable<ArtType> {
    return this.http.get<ArtType>(environment.api + `?id=${id}`)
  }
}
