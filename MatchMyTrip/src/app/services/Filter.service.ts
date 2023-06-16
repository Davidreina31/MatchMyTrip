import { Injectable } from '@angular/core';
import { FilterDTO } from '../models/FilterDTO';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FilterService {
    private _url: string = "http://localhost:5038/api/filter/"

    constructor(private _client: HttpClient) { }

    public add(a: FilterDTO): Observable<void> {
        return this._client.post<void>(this._url, a);
    }

    public getAll(): Observable<FilterDTO[]> {
        return this._client.get<FilterDTO[]>(this._url);
    }

    public getOne(id: number): Observable<FilterDTO> {
        return this._client.get<FilterDTO>(this._url + id);
    }

    public update(id: number, a: FilterDTO): Observable<void> {
        return this._client.put<void>(this._url + id, a);
    }

    public delete(id: number): Observable<void> {
        return this._client.delete<void>(this._url + id);
    }

}
