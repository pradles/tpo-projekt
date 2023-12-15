import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { DashboradComponent } from './components/dashborad/dashborad.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { OptionsComponent } from './components/options/options.component';
import { UsersComponent } from './components/users/users.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboradComponent, canActivate: [AuthGuard] },
  { path: 'expenses', component: ExpensesComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'options', component: OptionsComponent, canActivate: [AuthGuard] },
  { path: 'join-room', component: JoinRoomComponent },
  { path: '', redirectTo: '/join-room', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
