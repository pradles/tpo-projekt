// join-room.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent {
  roomName: string = '';
  roomPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  enter(): void {
    const isAuthenticated = this.authService.enter(this.roomName, this.roomPassword);

    if (isAuthenticated) {
      // Do something after successful login
      console.log('Login successful!');
      
      // Navigate to the dashboard
      this.router.navigate(['/dashboard']);
    } else {
      // Do something if login fails
      console.log('Login failed. Check your credentials.');
    }
  }
}
