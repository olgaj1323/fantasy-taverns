import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { TavernsService } from '../taverns.service';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
})
 export class BookRoomComponent implements OnInit {
    
  constructor(private tavernService: TavernsService) { }
  
  Guests = [];
  Rooms = [];
  
  BookStayForm = new FormGroup({
    guestSelected: new FormControl(null,Validators.required),
    roomSelected: new FormControl(null, Validators.required)
  });

  ngOnInit() {
    this.tavernService.getGuests().subscribe((GuestList) => {
      console.log(GuestList);
       this.Guests = GuestList;
     });
     this.tavernService.getRooms().subscribe((RoomList)=>{
      console.log(RoomList);
      this.Rooms = RoomList;
     });
  }

  saveBook():void{

  }

 }
