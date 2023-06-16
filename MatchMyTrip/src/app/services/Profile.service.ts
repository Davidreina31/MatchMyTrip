import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileDTO } from '../models/ProfileDTO';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileService {
    private _url: string = "http://localhost:5038/api/profile/"

    constructor(private _client: HttpClient) { }

    public add(a: ProfileDTO): Observable<void> {
        return this._client.post<void>(this._url, a);
    }

    public getAll(): Observable<ProfileDTO[]> {
        return this._client.get<ProfileDTO[]>(this._url);
    }

    public getOne(id: number): Observable<ProfileDTO> {
        return this._client.get<ProfileDTO>(this._url + id);
    }

    public update(id: number, a: ProfileDTO): Observable<void> {
        return this._client.put<void>(this._url + id, a);
    }

    public delete(id: number): Observable<void> {
        return this._client.delete<void>(this._url + id);
    }

}
