import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JourneyDTO } from '../models/JourneyDTO';
import { Observable } from 'rxjs';

@Injectable()
export class JourneyService {
    private _url: string = "http://localhost:5038/api/journey/"

    constructor(private _client: HttpClient) { }

    public add(a: JourneyDTO): Observable<void> {
        return this._client.post<void>(this._url, a);
    }

    public getAll(): Observable<JourneyDTO[]> {
        return this._client.get<JourneyDTO[]>(this._url);
    }

    public getOne(id: number): Observable<JourneyDTO> {
        return this._client.get<JourneyDTO>(this._url + id);
    }

    public update(id: number, a: JourneyDTO): Observable<void> {
        return this._client.put<void>(this._url + id, a);
    }

    public delete(id: number): Observable<void> {
        return this._client.delete<void>(this._url + id);
    }

}
