import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessagesDTO } from '../models/MessagesDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private _url: string = "http://localhost:5038/api/messages/"

  constructor(private _client: HttpClient) { }

  public add(a: MessagesDTO): Observable<void> {
      return this._client.post<void>(this._url, a);
  }

  public getAll(): Observable<MessagesDTO[]> {
      return this._client.get<MessagesDTO[]>(this._url);
  }

  public GetAllByConversationId(id: string): Observable<MessagesDTO[]> {
    return this._client.get<MessagesDTO[]>(this._url + "GetAllByConversationId/" + id);
}

  public getOne(id: string): Observable<MessagesDTO> {
      return this._client.get<MessagesDTO>(this._url + id);
  }

  public update(id: number, a: MessagesDTO): Observable<void> {
      return this._client.put<void>(this._url + id, a);
  }

  public delete(id: string): Observable<void> {
      return this._client.delete<void>(this._url + id);
  }

}
