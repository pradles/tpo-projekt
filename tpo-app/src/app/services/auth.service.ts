// auth.service.ts
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {map, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

// export class Message {
//   message: string;
//   loggedIn: boolean;
//
//   getMessage(): string {
//     return this.message;
//   }
//
//   contructor(message:string, loggedIn:boolean) {
//     this.message = message;
//     this.loggedIn = loggedIn;
//   }
// }

export class AuthService {
  private isAuthenticated = true; // dej na false za simulirt login | true je za development

  constructor(private httpClient: HttpClient) { }

  enter(roomName: string, password: string): Observable<any> {

    var subject = new Subject<{roomName:string, logged:boolean}>();
    this.httpClient.post<any>('http://localhost:3000/checkRoom', {
      name: roomName,
      pass: password
    }).subscribe((response) => {
      const user = {message: response.message, loggedIn: response.loggedIn};
      this.isAuthenticated = user.loggedIn;
      subject.next({roomName:roomName,logged:user.loggedIn});
    })
    return subject.asObservable()
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
