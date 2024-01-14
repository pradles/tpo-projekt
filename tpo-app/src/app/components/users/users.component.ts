import { Component } from '@angular/core';
import { CostsService } from '../../services/costs.service';
import { Observable } from 'rxjs';
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: any[] = [];
  name:string = ""
  // expenses: any[] = [];
  expenses$: Observable<any[]> = new Observable<any[]>();
  users$: Observable<any[]> = new Observable<any[]>();
    userDebts: any[] = [];

  username: string = ''

  constructor(private costsService: CostsService,private route:ActivatedRoute) {
    this.name = this.route.snapshot.params['name']

    this.expenses$ = this.costsService.getExpenses(this.name);
    this.users$ = this.costsService.getUsers(this.name)
    this.userDebts = this.costsService.calculateDebts();
  }

  /**
   * Get user name by id
   * @param id - id of the user
   * @returns name of the user
   */
  getUserName(id: number) {
    return this.costsService.getUserName(id);
  }

  /**
   * Add user
   */
  addUser() {
    if(this.checkUsernameInput()){
      this.costsService.addUser(this.username,this.name);
      this.username = '';
    }
  }

  /**
   * Alert if user is empty
   * @returns true / false
   */
  checkUsernameInput() {
    if (this.username === '') {
      this.showAlert('Expense name cannot be empty');
      return false;
    }
    return true;
  }

  /**
   * Shows pop up alert
   * @param message - string to alert
   */
  private showAlert(message: string): void {
    alert(message);
  }

}
