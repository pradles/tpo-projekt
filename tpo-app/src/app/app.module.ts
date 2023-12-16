import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboradComponent } from './components/dashborad/dashborad.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';
import { ExpensesComponent } from './components/expenses/expenses.component';
import { OptionsComponent } from './components/options/options.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { UsersComponent } from './components/users/users.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AppComponent,
    DashboradComponent,
    JoinRoomComponent,
    ExpensesComponent,
    OptionsComponent,
    MenuBarComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
