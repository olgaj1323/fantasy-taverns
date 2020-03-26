import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../common/auth/auth.guard';
import { TavernComponent } from './tavern/tavern.component';
import { ModifyRoomComponent } from './modify-room/modify-room.component';

const tavernRoutes: Routes = [
    { path: 'myTavern', component: TavernComponent, canActivate: [AuthGuard] },
    { path: 'modifyRoom/:roomID', component: ModifyRoomComponent, canActivate: [AuthGuard] },
    
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(tavernRoutes)],
})
export class TavernRoutingModule {
    
}