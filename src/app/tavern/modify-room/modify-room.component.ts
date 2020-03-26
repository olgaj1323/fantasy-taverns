import { Component, OnInit } from '@angular/core';
import {  NgForm, FormGroup, FormControl, Validators, } from '@angular/forms';
import { IRoom, TavernsService } from '../taverns.service';
import { isRegExp } from 'util';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modify-room',
  templateUrl: './modify-room.component.html',
})
export class ModifyRoomComponent implements OnInit {

  isNew: boolean;
  room: IRoom;
  roomForm = new FormGroup({
    roomName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    DailyRate: new FormControl('', Validators.required)
  });


  constructor(private tavernsService: TavernsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const roomID: string = this.route.snapshot.params.roomID;
    console.log(roomID);
    if (roomID === 'Add' ) {
      this.isNew = true;
      this.room={
        ID: 0,
        RoomName: '',
        DailyRate: 0
      }
      console.log('is new',this.isNew);

    } else {
      this.isNew = false;
      this.tavernsService.getById(+roomID).subscribe((room) => {
        console.log('Room by Id', room);
        this.room = room;
        this.roomForm.setValue(
          {roomName:
            room.RoomName,
            DailyRate: room.DailyRate});
      });
    }
  }
  saveRoom(): void {
    if (this.roomForm.valid) {
      this.room.RoomName = this.roomForm.value.roomName;
      this.room.DailyRate = this.roomForm.value.DailyRate;
      if (this.isNew) {
        this.room.ID = 0;
        console.log('this.roo.ID = 0',this.room.ID);
      }
     console.log('NewRoom', this.room);
      this.tavernsService.saveRoom(this.room).subscribe((roomAdd: IRoom) => {
       console.log(roomAdd);
       this.router.navigate(['/myTavern']);
      });
    }
  }
}
