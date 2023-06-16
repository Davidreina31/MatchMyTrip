import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../models/UserDTO';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
    private _url: string = "http://localhost:5038/api/user/"

    constructor(private _client: HttpClient) { }

    public add(a: UserDTO): Observable<void> {
        return this._client.post<void>(this._url, a);
    }

    public getAll(): Observable<UserDTO[]> {
        return this._client.get<UserDTO[]>(this._url);
    }

    public getOne(id: number): Observable<UserDTO> {
        return this._client.get<UserDTO>(this._url + id);
    }

    public update(id: number, a: UserDTO): Observable<void> {
        return this._client.put<void>(this._url + id, a);
    }

    public delete(id: number): Observable<void> {
        return this._client.delete<void>(this._url + id);
    }

}
