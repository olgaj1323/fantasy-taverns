import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { IRoom, TavernsService } from '../taverns.service';
import { isRegExp } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-room',
  templateUrl: './modify-room.component.html',
})
export class ModifyRoomComponent implements OnInit {

  constructor(private tavernsService: TavernsService, private router:Router) { }

  ngOnInit() {
  }
  saveRoom(roomForm: NgForm): void {
    console.log(roomForm);
    console.log(roomForm.valid);
    if (roomForm.valid) {
      const newRoom: IRoom = roomForm.value;
       newRoom.ID = 0;
     console.log(newRoom);
      this.tavernsService.saveRoom(newRoom).subscribe((roomAdd: IRoom) => {
       console.log(roomAdd);
       this.router.navigate(['/myTavern']);
      });
    }
  }
}
