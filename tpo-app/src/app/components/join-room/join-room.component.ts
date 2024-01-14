// join-room.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CostsService } from '../../services/costs.service';
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent {
  roomName: string = '';
  roomPassword: string = '';
  roomPasswordRepeat: string = '';
  showCreateRoom: boolean = false;

  isModalOpen: boolean = false;
  removeExpenseId = -1;
  modalMessage = '';

  constructor(private authService: AuthService,
              private router: Router,
              private cost: CostsService) {}

  toggleCreateRoom() {
    this.showCreateRoom = !this.showCreateRoom;
  }

  createNewRoom() {
    if (this.roomName && this.roomPassword) {
      if (this.roomPassword === this.roomPasswordRepeat) {
        const req = this.cost.createRoom(this.roomName, this.roomPassword);
        req.subscribe();
        this.toggleCreateRoom();
        this.roomName = '';
        this.roomPassword = '';
        this.roomPasswordRepeat = '';
      } else {
        this.toggleModal('Passwords do not match');
        // console.error('Passwords do not match');
      }
    } else {
      this.toggleModal('Room name or password cannot be empty');
      // console.error('Room name or password cannot be empty');
    }
  }

  /**
   * Open pop up for error or deletion of expense
   * @param message - displayed message
   * @param expenseId - id of expense, if nothing provided set to -1
   */
  toggleModal(message: string, expenseId: number = -1) {
    setTimeout(() => {
      this.modalMessage = message;
      this.removeExpenseId = expenseId;
      this.isModalOpen = !this.isModalOpen;
    }, 0);
  }

  enter(): void {
    const isAuthenticated = this.authService.enter(this.roomName, this.roomPassword).subscribe((value) => {
      if (value.logged) {
        // Do something after successful login
        console.log('Login successful!');
        console.log(value)
        // Navigate to the dashboard
        this.router.navigate(['/'+value.roomName+'/dashboard']);
      } else {
        // Do something if login fails
        console.log('Login failed. Check your credentials.');
      }
    });


  }
}
