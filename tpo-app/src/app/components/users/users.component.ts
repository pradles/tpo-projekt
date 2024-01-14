import { Component } from '@angular/core';
import { CostsService } from '../../services/costs.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: any[] = [];
  // expenses: any[] = [];
  expenses$: Observable<any[]> = new Observable<any[]>();

  userDebts: any[] = [];

  username: string = ''

  constructor(private costsService: CostsService) {
    this.users = this.costsService.getUsers();
    this.expenses$ = this.costsService.getExpenses();
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
      this.costsService.addUser(this.username);
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
