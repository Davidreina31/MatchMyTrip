import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivityDTO } from '../models/ActivityDTO';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ActivityService {

    private _url: string = "http://localhost:5038/api/activity/"

    constructor(private _client: HttpClient) { }

    public add(a: ActivityDTO): Observable<void> {
        return this._client.post<void>(this._url, a);
    }

    public getAll(): Observable<ActivityDTO[]> {
        return this._client.get<ActivityDTO[]>(this._url);
    }

    public getOne(id: string): Observable<ActivityDTO> {
        return this._client.get<ActivityDTO>(this._url + id);
    }

    public update(id: number, a: ActivityDTO): Observable<void> {
        return this._client.put<void>(this._url + id, a);
    }

    public delete(id: string): Observable<void> {
        return this._client.delete<void>(this._url + id);
    }

}
