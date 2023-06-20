import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileDTO } from '../models/ProfileDTO';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private _url: string = "http://localhost:5038/api/search/"

constructor(private _client: HttpClient) { }

public searchByKeyWord(keyWord: string): Observable<ProfileDTO[]>{
  return this._client.get<ProfileDTO[]>(this._url + keyWord);
}

}
