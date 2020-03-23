import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ITavern {
    ID: number;
    TavernName: string;
}

export interface IRoom{
    ID: number;
    RoomName: string;
    DailyRate: number;
}

@Injectable({
    providedIn: 'root',
})
export class TavernsService {
    constructor(private http: HttpClient) {}

    
    getAll(): Observable<ITavern[]> {
        return this.http.get<ITavern[]>(
            `http://localhost:3000/taverns`,
        );
    }

    getRoom(tavernID:number): Observable<IRoom[]>{
        return this.http.get<IRoom[]>(`http://localhost:3000/rooms?tavernid=${tavernID}`)
    }
}