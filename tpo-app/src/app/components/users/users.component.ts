import { Component } from '@angular/core';
import { CostsService } from '../../services/costs.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: any[] = [];
  expenses: any[] = [];
  userDebts: any[] = [];

  username: string = ''

  constructor(private costsService: CostsService) {
    this.users = this.costsService.getUsers();
    this.expenses = this.costsService.getExpenses();
    this.calculateDebts();
  }

  /**
   * Calculate the debt for each user
   */
  private calculateDebts(): void {
    // Go over each expense
    this.expenses.forEach(expense => {
      const { paidBy, price, users } = expense;
      // Go over what each user paid for the expense
      users.forEach((user: any) => {
          const share = (user.percentage / 100) * price;
          // If user didnt pay the actual expense add to his debt
          if (user.userId !== paidBy) {
            const debtor = user.userId;
            const amount = share;
            
            const existingUserIndex = this.userDebts.findIndex(debt => debt.userId === paidBy);

            if (existingUserIndex !== -1) {
              // User already exists, check if the debts.user exists
              const existingDebtorIndex = this.userDebts[existingUserIndex].debts.findIndex((debt:any) => debt.userId === debtor);

              if (existingDebtorIndex !== -1) {
                // Debtor already exists, update the amount
                this.userDebts[existingUserIndex].debts[existingDebtorIndex].amount += amount;
              } else {
                // Debtor doesn't exist, add a new debt
                this.userDebts[existingUserIndex].debts.push({ userId: debtor, amount: amount });
              }
            } else {
              // User doesn't exist, add a new entry
              this.userDebts.push({ userId: paidBy, debts: [{ userId: debtor, amount: amount }] });
            }
          }
      
      });
    });
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
