import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Journey_ActivityDTO } from '../models/Journey_ActivityDTO';
import { Observable } from 'rxjs';

@Injectable()
export class Journey_ActivityService {
    private _url: string = "http://localhost:5038/api/journey_activity/"

    constructor(private _client: HttpClient) { }

    public add(a: Journey_ActivityDTO): Observable<void> {
        return this._client.post<void>(this._url, a);
    }

    public getAll(): Observable<Journey_ActivityDTO[]> {
        return this._client.get<Journey_ActivityDTO[]>(this._url);
    }

    public getOne(id: number): Observable<Journey_ActivityDTO> {
        return this._client.get<Journey_ActivityDTO>(this._url + id);
    }

    public update(id: number, a: Journey_ActivityDTO): Observable<void> {
        return this._client.put<void>(this._url + id, a);
    }

    public delete(id: number): Observable<void> {
        return this._client.delete<void>(this._url + id);
    }

}
