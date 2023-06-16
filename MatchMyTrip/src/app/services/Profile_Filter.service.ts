import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile_FilterDTO } from '../models/Profile_FilterDTO';
import { Observable } from 'rxjs';

@Injectable()
export class Profile_FilterService {
    private _url: string = "http://localhost:5038/api/profile_filter/"

    constructor(private _client: HttpClient) { }

    public add(a: Profile_FilterDTO): Observable<void> {
        return this._client.post<void>(this._url, a);
    }

    public getAll(): Observable<Profile_FilterDTO[]> {
        return this._client.get<Profile_FilterDTO[]>(this._url);
    }

    public getOne(id: number): Observable<Profile_FilterDTO> {
        return this._client.get<Profile_FilterDTO>(this._url + id);
    }

    public update(id: number, a: Profile_FilterDTO): Observable<void> {
        return this._client.put<void>(this._url + id, a);
    }

    public delete(id: number): Observable<void> {
        return this._client.delete<void>(this._url + id);
    }

}
