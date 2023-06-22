import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match_ProfileDTO } from '../models/Match_ProfileDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Match_ProfileService {

  private _url: string = "http://localhost:5038/api/match_profile/"

  constructor(private _client: HttpClient) { }

  public add(a: Match_ProfileDTO): Observable<void> {
      return this._client.post<void>(this._url, a);
  }

  public getAll(): Observable<Match_ProfileDTO[]> {
      return this._client.get<Match_ProfileDTO[]>(this._url);
  }

  public getByProfileId(id: string): Observable<Match_ProfileDTO[]> {
      return this._client.get<Match_ProfileDTO[]>(this._url + "GetByProfileId/" + id);
  }

  public getOne(id: number): Observable<Match_ProfileDTO> {
      return this._client.get<Match_ProfileDTO>(this._url + id);
  }

  public update(id: number, a: Match_ProfileDTO): Observable<void> {
      return this._client.put<void>(this._url + id, a);
  }

  public delete(id: string): Observable<void> {
      return this._client.delete<void>(this._url + id);
  }

  public deleteByTwoIds(matchId: string, profileId: string): Observable<void> {
      return this._client.delete<void>(this._url + matchId + "/" + profileId);
  }

}
