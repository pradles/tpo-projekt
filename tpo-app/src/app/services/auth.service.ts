// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = true; // dej na false za simulirt login | true je za development

  constructor() { }

  enter(roomName: string, password: string): boolean {
    // In a real application, you'd perform authentication with a server.
    // For this example, let's consider a simple case where the username is 'user' and password is 'password'.
    if (roomName === 'user' && password === 'password' || true) { // || true je da lohk logins brez podatku
      this.isAuthenticated = true;
      return true;
    } else {
      this.isAuthenticated = false;
      return false;
    }
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
