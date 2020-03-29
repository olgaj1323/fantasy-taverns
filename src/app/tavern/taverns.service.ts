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
export interface IGuest {
    ID: number;
    GuestName: string;
}
@Injectable({
    providedIn: 'root',
})
export class TavernsService {
    constructor(private http: HttpClient) {}

    getTavernInfo(): Observable<ITavern> {
        return this.http.get<ITavern>(`http://localhost:3000/tavern`,
        );
     }
    // get tavern inv the dropdown
    getAll(): Observable<ITavern[]> {
        return this.http.get<ITavern[]>(
            `http://localhost:3000/taverns`,
        );
    }
    // get Rooms of a Tavern with Taver ID
    getRoom(searchText: string): Observable<IRoom[]> {
        return this.http.get<IRoom[]>(`http://localhost:3000/rooms?Search=${searchText}`);
    }

    getById(id: number): Observable<IRoom> {
        return this.http.get<IRoom>(`http://localhost:3000/rooms/${id}`);
    }
    // Add room to Tavern
    saveRoom(newRoom: IRoom): Observable<IRoom> {
        const isEdit = newRoom.ID > 0;
        // edit room, Use put with Id
        if (isEdit)  {
            return this.http.put<IRoom>(`http://localhost:3000/room/${newRoom.ID}`, newRoom);
        } else {
            // new room, use post without ID
            return this.http.post<IRoom>(`http://localhost:3000/room`, newRoom);
        }
    }
    getGuests(): Observable<IGuest[]> {
        return this.http.get<IGuest[]>(
            `http://localhost:3000/guests`,
        );
    }
    getRooms(): Observable<IRoom[]> {
        return this.http.get<IRoom[]>(
            `http://localhost:3000/allRooms`,
        );
    }
}
