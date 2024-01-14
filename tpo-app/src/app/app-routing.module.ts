import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

import { DocumentationComponent } from './components/documentation/documentation.component';
import { DashboradComponent } from './components/dashborad/dashborad.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { OptionsComponent } from './components/options/options.component';
import { UsersComponent } from './components/users/users.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';

const routes: Routes = [
  { path: ':name/dashboard', component: DashboradComponent, canActivate: [AuthGuard] },
  { path: ':name/documentation', component: DocumentationComponent, canActivate: [AuthGuard] },
  { path: ':name/expenses', component: ExpensesComponent, canActivate: [AuthGuard] },
  { path: ':name/users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: ':name/options', component: OptionsComponent, canActivate: [AuthGuard] },
  { path: 'join-room', component: JoinRoomComponent },
  { path: '', redirectTo: '/join-room', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
