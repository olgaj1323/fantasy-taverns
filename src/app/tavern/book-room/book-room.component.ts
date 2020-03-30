import { Component, OnInit, getDebugNode } from '@angular/core';
import { Subscriber } from 'rxjs';
import { TavernsService, IRoom, IGuest } from '../taverns.service';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { DatepickerService } from '../datepicker.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
})
 export class BookRoomComponent implements OnInit {
    
  constructor(private tavernService: TavernsService, private data:DatepickerService, private datePipe: DatePipe,private router: Router) { }
  
  Guests = [];
  Rooms = [];
  message:string;
  dates:NgbDate[]
  arrivalDate:NgbDate;
  departureDate:NgbDate;
  room:IRoom;
  guest:IGuest;
  bookingDay:string;
  startDate:string;
  
  
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
     this.data.currentMessage.subscribe((message:NgbDate[]) => {
      console.log('Dates from picker', message);
      if(message){
        if(message[1]){
          this.arrivalDate = message[0];
        this.departureDate = message[1];
        
      console.log('Dates from picker', message[0]);
      console.log('Dates from picker', message[1]);
      this.getDates(this.arrivalDate);
        }
        
      }
      this.dates = message;
      });
  }

  getDates(arrivalDate:NgbDate):void{
    const today= Date.now();
    this.bookingDay =  this.datePipe.transform(today,"yyyy-MM-dd");
    console.log('Today', this.bookingDay);
    this.startDate = this.arrivalDate.year + '-' + this.arrivalDate.month + '-'+ this.arrivalDate.day;
    console.log('Start Day', this.startDate);
   

  }


  saveBook():void{
    if(this.BookStayForm.valid){
      this.guest = this.BookStayForm.controls.guestSelected.value;
      this.room = this.BookStayForm.controls.roomSelected.value;
      console.log('guest Selected',this.BookStayForm.controls.guestSelected.value);
      console.log('room Selected',this.BookStayForm.controls.roomSelected.value);
    }
    const payload = {
      BookingDate: this.bookingDay,
      GuestID: this.guest.ID,
      RoomID: this.room.ID,
      StayDateStart:this.startDate,
      StayLength:1,
      DailyRate: this.room.DailyRate,
      };
      console.log('room.DailyRate',this.room.DailyRate);
      console.log('room.DailyRate',this.room.ID);
      console.log('payload',payload)
      this.tavernService.bookingRoom(payload).subscribe((bookedroom) =>{
        this.router.navigateByUrl('/myTavern');
      })
       
  }
  cancel(event):void{
    
  }

 }
