import { Component, OnInit, OnDestroy } from '@angular/core';
import { TavernsService, IRoom } from '../taverns.service';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { AuthService } from '../../common/auth/auth.service';

@Component({
  selector: 'app-tavern',
  templateUrl: './tavern.component.html'
})
export class TavernComponent implements OnInit, OnDestroy {
  roomsTavern: IRoom[];
  searchText = '';
  searchUpdated = new Subject<string>();
  subscription = new Subscription();
  isAdmin = false;

  constructor(private tavernservice: TavernsService, private authService: AuthService) {
    this.subscription = this.searchUpdated
    .pipe(
      debounceTime(300),
      distinctUntilChanged())
    .subscribe((searchValue) => {
        this.searchRoom(searchValue);
    });
   }
  tavernID: number;
  tavernName: string;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.tavernservice.getTavernInfo().subscribe((tavern)=>{
        this.tavernID = tavern.ID;
        this.tavernName = tavern.TavernName;
    });
    this.tavernservice.getRoom('').subscribe((rooms) => {
    this.roomsTavern = rooms;
    console.log('Rooms', this.roomsTavern.length);
    });
    this.isAdmin = this.authService.isAdmin();
}
  search($event): void {
    this.searchUpdated.next($event.target.value);
  }

   searchRoom(searchValue: string){
    this.tavernservice.getRoom(searchValue).subscribe((returnedRooms) => {
      console.log(returnedRooms);
      this.roomsTavern = returnedRooms;
    });
   }

  

}
