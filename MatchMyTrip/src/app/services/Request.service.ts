import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestDTO } from '../models/RequestDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private _url: string = "http://localhost:5038/api/request/"

  constructor(private _client: HttpClient) { }

  public add(a: RequestDTO): Observable<void> {
      return this._client.post<void>(this._url, a);
  }

  public getAll(): Observable<RequestDTO[]> {
      return this._client.get<RequestDTO[]>(this._url);
  }

  public getAllByProfileId(id: string): Observable<RequestDTO[]> {
    return this._client.get<RequestDTO[]>(this._url + "GetByProfileId/" + id);
}

  public getOne(id: string): Observable<RequestDTO> {
      return this._client.get<RequestDTO>(this._url + id);
  }

  public update(id: string, a: RequestDTO): Observable<void> {
      return this._client.put<void>(this._url + id, a);
  }

  public delete(id: string): Observable<void> {
      return this._client.delete<void>(this._url + id);
  }

}
