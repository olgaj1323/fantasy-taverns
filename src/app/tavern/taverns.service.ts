import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ITavern {
    ID: number;
    TavernName: string;
}

export interface IRoom {
    ID: number;
    RoomName: string;
    DailyRate: number;
}

@Injectable({
    providedIn: 'root',
})
export class TavernsService {
    constructor(private http: HttpClient) {}

    getTavernInfo():Observable<ITavern>{
        return this.http.get<ITavern>(`http://localhost:3000/tavern`,
        );
     }
    //get tavern inv the dropdown
    getAll(): Observable<ITavern[]> {
        return this.http.get<ITavern[]>(
            `http://localhost:3000/taverns`,
        );
    }
    // get Rooms of a Tavern with Taver ID

    getRoom(searchText:string): Observable<IRoom[]> {
        return this.http.get<IRoom[]>(`http://localhost:3000/rooms?Search=${searchText}`);
    }

    // Add room to Tavern
    saveRoom(newRoom: IRoom): Observable<IRoom> {
        return this.http.post<IRoom>(`http://localhost:3000/room`, newRoom);
    }
}
