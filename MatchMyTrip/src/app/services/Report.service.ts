import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReportDTO } from '../models/ReportDTO';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReportService {
    private _url: string = "http://localhost:5038/api/report/"

    constructor(private _client: HttpClient) { }

    public add(a: ReportDTO): Observable<void> {
        return this._client.post<void>(this._url, a);
    }

    public getAll(): Observable<ReportDTO[]> {
        return this._client.get<ReportDTO[]>(this._url);
    }

    public getOne(id: string): Observable<ReportDTO> {
        return this._client.get<ReportDTO>(this._url + id);
    }

    public update(id: string, a: ReportDTO): Observable<void> {
        return this._client.put<void>(this._url + id, a);
    }

    public delete(id: string): Observable<void> {
        return this._client.delete<void>(this._url + id);
    }

}
