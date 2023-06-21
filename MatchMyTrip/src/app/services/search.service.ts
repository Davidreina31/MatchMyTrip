import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileDTO } from '../models/ProfileDTO';
import { FilterDTO } from '../models/FilterDTO';
import { MatchDTO } from '../models/MatchDTO';
import { JourneyDTO } from '../models/JourneyDTO';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _url: string = "http://localhost:5038/api/search/"

constructor(private _client: HttpClient) { }

public searchByKeyWord(keyWord: string): Observable<ProfileDTO[]>{
  return this._client.get<ProfileDTO[]>(this._url + keyWord);
}

public searchByFilter(filter: FilterDTO): Observable<JourneyDTO[]>{
  return this._client.post<JourneyDTO[]>(this._url, filter);
}

}
