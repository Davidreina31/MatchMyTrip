import { Injectable } from '@angular/core';
import { MatchDTO } from '../models/MatchDTO';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MatchService {
    private _url: string = "http://localhost:5038/api/match/"

    constructor(private _client: HttpClient) { }

    public add(a: MatchDTO): Observable<void> {
        return this._client.post<void>(this._url, a);
    }

    public getAll(): Observable<MatchDTO[]> {
        return this._client.get<MatchDTO[]>(this._url);
    }

    public getOne(id: number): Observable<MatchDTO> {
        return this._client.get<MatchDTO>(this._url + id);
    }

    public update(id: number, a: MatchDTO): Observable<void> {
        return this._client.put<void>(this._url + id, a);
    }

    public delete(id: number): Observable<void> {
        return this._client.delete<void>(this._url + id);
    }

}
