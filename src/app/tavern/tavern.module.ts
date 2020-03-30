import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TavernComponent } from './tavern/tavern.component';
import { TavernRoutingModule } from './tavern-routing.module';
import { ModifyRoomComponent } from './modify-room/modify-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookRoomComponent } from './book-room/book-room.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerRangeComponent } from './datepicker/datepicker-range';





@NgModule({
  declarations: [TavernComponent, ModifyRoomComponent, BookRoomComponent, NgbdDatepickerRangeComponent ],
  imports: [
    CommonModule, FormsModule , ReactiveFormsModule, TavernRoutingModule, NgbModule ],
  
    
})
export class TavernModule {}
