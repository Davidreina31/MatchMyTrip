import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConversationDTO } from '../models/ConversationDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {
  private _url: string = "http://localhost:5038/api/conversation/"

  constructor(private _client: HttpClient) { }

  public add(a: ConversationDTO): Observable<void> {
      return this._client.post<void>(this._url, a);
  }

  public getAll(): Observable<ConversationDTO[]> {
      return this._client.get<ConversationDTO[]>(this._url);
  }

  public GetAllByProfileConnectedId(id: string): Observable<ConversationDTO[]> {
    return this._client.get<ConversationDTO[]>(this._url + "GetAllByProfileConnectedId/" + id);
}

  public getOne(id: string): Observable<ConversationDTO> {
      return this._client.get<ConversationDTO>(this._url + id);
  }

  public update(id: number, a: ConversationDTO): Observable<void> {
      return this._client.put<void>(this._url + id, a);
  }

  public delete(id: string): Observable<void> {
      return this._client.delete<void>(this._url + id);
  }

}
