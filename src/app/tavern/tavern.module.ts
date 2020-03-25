import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TavernComponent } from './tavern/tavern.component';
import { TavernRoutingModule } from './tavern-routing.module';
import { ModifyRoomComponent } from './modify-room/modify-room.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [TavernComponent, ModifyRoomComponent],
  imports: [
    CommonModule, FormsModule ,TavernRoutingModule, ],
})
export class TavernModule {}
