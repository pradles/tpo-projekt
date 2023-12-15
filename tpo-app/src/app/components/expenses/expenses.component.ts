import { Component } from '@angular/core';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.css'
})
export class ExpensesComponent {
  expensesDetails: number = -1;

  expenses = [
    { expense: 'Gas money', 
      paidBy: 'Miha', 
      price: 43.3, 
      date: '2. 1. 2024', 
      users: [ {name: 'Miha', percentage: 0.4}, {name: 'Bojan', percentage: 0.6} ], 
      description: 'Lorem ipsum ' },

    { expense: 'Lunch at lunch place', 
      paidBy: 'Bojan', 
      price: 50.44, 
      date: '3. 2. 2022', 
      users: [ {name: 'Miha', percentage: 0.5}, {name: 'Bojan', percentage: 0.5} ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet tincidunt purus at ornare. ' },

    { expense: 'Lunch at lunch place2', 
      paidBy: 'Bojan', 
      price: 503.44, 
      date: '3. 2. 2022', 
      users: [ {name: 'Miha', percentage: 0.5}, {name: 'Bojan', percentage: 0.5} ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet tincidunt purus at ornare. ' },

    { expense: 'Lunch at lunch place3', 
      paidBy: 'Bojan', 
      price: 210.44, 
      date: '3. 2. 2022', 
      users: [ {name: 'Miha', percentage: 0.5}, {name: 'Bojan', percentage: 0.5} ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet tincidunt purus at ornare. ' },
  ];

  toggleDetails(providedExpensesIndex: number) {
    // If we clicked on the same dropdown again make it dissapear
    if(providedExpensesIndex == this.expensesDetails)
      this.expensesDetails = -1;
    else
      this.expensesDetails = providedExpensesIndex;
  }

  getTotalExpenses(): number {
    return this.expenses.reduce((total, expense) => total + expense.price, 0);
  }

}
