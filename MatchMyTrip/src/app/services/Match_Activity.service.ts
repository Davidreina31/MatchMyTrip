import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Match_ActivityDTO } from '../models/Match_ActivityDTO';
import { Observable } from 'rxjs';

@Injectable()
export class Match_ActivityService {
    private _url: string = "http://localhost:5038/api/match_activity/"

    constructor(private _client: HttpClient) { }

    public add(a: Match_ActivityDTO): Observable<void> {
        return this._client.post<void>(this._url, a);
    }

    public getAll(): Observable<Match_ActivityDTO[]> {
        return this._client.get<Match_ActivityDTO[]>(this._url);
    }

    public getOne(id: number): Observable<Match_ActivityDTO> {
        return this._client.get<Match_ActivityDTO>(this._url + id);
    }

    public update(id: number, a: Match_ActivityDTO): Observable<void> {
        return this._client.put<void>(this._url + id, a);
    }

    public delete(id: number): Observable<void> {
        return this._client.delete<void>(this._url + id);
    }

}
