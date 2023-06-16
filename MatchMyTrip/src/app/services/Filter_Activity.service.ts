import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter_ActivityDTO } from '../models/Filter_ActivityDTO';
import { Observable } from 'rxjs';

@Injectable()
export class Filter_ActivityService {
    private _url: string = "http://localhost:5038/api/filter_activity/"

    constructor(private _client: HttpClient) { }

    public add(a: Filter_ActivityDTO): Observable<void> {
        return this._client.post<void>(this._url, a);
    }

    public getAll(): Observable<Filter_ActivityDTO[]> {
        return this._client.get<Filter_ActivityDTO[]>(this._url);
    }

    public getOne(id: number): Observable<Filter_ActivityDTO> {
        return this._client.get<Filter_ActivityDTO>(this._url + id);
    }

    public update(id: number, a: Filter_ActivityDTO): Observable<void> {
        return this._client.put<void>(this._url + id, a);
    }

    public delete(id: number): Observable<void> {
        return this._client.delete<void>(this._url + id);
    }

}
