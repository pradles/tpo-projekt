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

  private calculateDebts(): void {

    this.expenses.forEach(expense => {
      const { paidBy, price, users } = expense;

      users.forEach((user: any) => {
          const share = (user.percentage / 100) * price;

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

  getUserName(id: number) {
    return this.costsService.getUserName(id);
  }

  addUser() {
    if(this.checkUsernameInput()){
      this.costsService.addUser(this.username);
      this.username = '';
    }
  }

  checkUsernameInput() {
    if (this.username === '') {
      this.showAlert('Expense name cannot be empty');
      return false;
    }
    return true;
  }

  private showAlert(message: string): void {
    alert(message);
  }

}
