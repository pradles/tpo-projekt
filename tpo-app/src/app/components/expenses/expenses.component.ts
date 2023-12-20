import { Component } from '@angular/core';
import { CostsService } from '../../services/costs.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css',
  providers: [DatePipe],
})
export class ExpensesComponent {
  date: any;

  constructor(private costsService: CostsService, private datePipe: DatePipe) {
      this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    }
    
  expenses = this.costsService.getExpenses();
  users = this.costsService.getUsers();

  expenseName: string = '';
  paidBy: number = -1;
  price: any = undefined;
  description: string = '';
  usersPercentages: { userId: number; percentage: number }[] = this.users.map((_, index) => ({
    userId: index,
    percentage: +(100 / this.users.length).toFixed(1),
  }));

  expensesDetails: number = -1; //which expense details to show

  
  /**
   * Show / hide expenses details on click
   * @param providedExpensesIndex - what expense was clicked
   */
  toggleDetails(providedExpensesIndex: number) {
    // If we clicked on the same dropdown again make it dissapear
    if(providedExpensesIndex == this.expensesDetails)
      this.expensesDetails = -1;
    else
      this.expensesDetails = providedExpensesIndex;
  }
  /**
   * Get the summ of all the expenses
   * @returns the sum of all expenses
   */
  getTotalExpenses(): number {
    return this.costsService.getSumExpenses();
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
   * Add expense with the necessary data
   */
  addExpense() {
    if(this.checkExpenseInput()){
      this.costsService.addExpense(this.expenseName, this.paidBy, this.price, this.date, this.usersPercentages, this.description);

      // Set back to default values
      this.expenseName = '';
      this.paidBy = -1;
      this.price = undefined;
      this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      this.usersPercentages = this.users.map((_, index) => ({
        userId: index,
        percentage: +(100 / this.users.length).toFixed(1),
      }));
      this.description = '';
    }
  }

  /**
   * Checks if the percentages add up to 100 (99.9)
   * @returns true / false
   */
  checkPercentages() {
    const sum = this.usersPercentages.reduce((total, user) => total + user.percentage, 0);
    if (sum > 99.8 && sum <= 100) {
      return true
    } else {
      return false
    }
  }

  /**
   * Check if the given data exists and alerts us if it doesnt
   * @returns true / false
   */
  checkExpenseInput() {
    if (this.expenseName === '') {
      this.showAlert('Expense name cannot be empty');
      return false;
    }
  
    if (this.paidBy === -1) {
      this.showAlert('Please select who paid for the expense');
      return false;
    }
  
    if (this.price <= 0) {
      this.showAlert('Price must be greater than 0');
      return false;
    }
  
    if (!this.checkPercentages()) {
      this.showAlert('Invalid percentages. Please adjust.');
      return false;
    }
  
    // If all conditions pass, return true
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
