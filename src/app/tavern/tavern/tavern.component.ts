import { Component, OnInit } from '@angular/core';
import { TavernsService } from '../taverns.service';

@Component({
  selector: 'app-tavern',
  templateUrl: './tavern.component.html'
})
export class TavernComponent implements OnInit {

  constructor(private tavernservice: TavernsService) { }
  roomsTavern = [];
  tavernID = 1;
  tavernName = 'Moe\'s Tavern';
  
  ngOnInit(): void {
      
      this.tavernservice.getRoom(this.tavernID).subscribe((rooms) => {
      this.roomsTavern = rooms;
      console.log('Rooms', this.roomsTavern.length);
      });


  }

}
