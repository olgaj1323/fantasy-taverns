import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TavernComponent } from './tavern/tavern.component';
import { TavernRoutingModule } from './tavern-routing.module';



@NgModule({
  declarations: [TavernComponent],
  imports: [
    CommonModule, TavernRoutingModule, ],
})
export class TavernModule {}
