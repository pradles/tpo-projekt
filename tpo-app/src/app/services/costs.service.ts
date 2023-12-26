import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CostsService {

  constructor() { }

  // Zamenjat szi backendm
  expenses = [ 
    { id: 0,
      expenseName: 'Gas money', 
      paidBy: 0, 
      price: 100, 
      date: '2. 1. 2024', 
      users: [ {userId: 0, percentage: 40}, {userId: 1, percentage: 60} ], 
      description: 'Lorem ipsum ' },

    { id: 1,
      expenseName: 'Lunch at lunch place', 
      paidBy: 1, 
      price: 50.44, 
      date: '3. 2. 2022', 
      users: [ {userId: 0, percentage: 33.3}, {userId: 1, percentage: 33.3}, {userId: 2, percentage: 33.3} ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' },

    { id: 2,
      expenseName: 'Lunch at lunch place2', 
      paidBy: 2, 
      price: 503.44, 
      date: '3. 2. 2022', 
      users: [ {userId: 0, percentage: 30}, {userId: 1, percentage: 50}, {userId: 2, percentage: 20} ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet tincidunt purus at ornare. elit. Praesent aliquet tincidunt purus at ornare. ' },

    { id: 3,
      expenseName: 'Lunch at lunch place3', 
      paidBy: 1, 
      price: 210.44, 
      date: '3. 2. 2022', 
      users: [ {userId: 0, percentage: 0}, {userId: 1, percentage: 50}, {userId: 2, percentage: 50} ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet tincidunt purus at ornare. ' },
  ];

  users = [
    { id: 0, name: 'Miha' },
    { id: 1, name: 'Bojan' },
    { id: 2, name: 'Jože' },
  ];




  getExpenses() {
    return this.expenses;
  }

  getExpense(providedExpenseId: number) {
    return this.expenses.find(expense => expense.id = providedExpenseId);
  }

  addExpense(expenseName: string, paidBy: number, price: number, date: string, users: { userId: number; percentage: number }[], description: string) {
    let paidByInt: number = +paidBy;
    let newIndex = this.expenses[this.expenses.length-1].id+1;
    const newExpense = { id: newIndex, expenseName: expenseName, paidBy: paidByInt, price: price, date: date, users: users, description: description};
    this.expenses.push(newExpense);
  }

  getSumExpenses(): number {
    return this.expenses.reduce((total, expense) => total + expense.price, 0);
  }

  
  getUsers() {
    return this.users;
  }

  addUser(username: string) {
    const lastUserId = this.users.length > 0 ? this.users[this.users.length - 1].id : -1;
    this.users.push({ id: lastUserId + 1, name: username });
  }

  getUserName(id: number): string | undefined {
    const user = this.users.find(user => user.id === id);
    return user ? user.name : undefined;
  }

  getUsersLenght() {
    return this.users.length;
  }

  /**
   * Calculate the debt for each user
   */
  calculateTotalExpenses(): { userId: number; totalExpense: number }[] {
    const userTotalExpenses: { userId: number; totalExpense: number }[] = [];

    // Initialize userTotalExpenses array with zeros for each user
    this.users.forEach(user => {
      userTotalExpenses.push({ userId: user.id, totalExpense: 0 });
    });

    // Go over each expense and accumulate the total expenses for each user
    this.expenses.forEach(expense => {
      const { paidBy, price, users } = expense;

      users.forEach(user => {
        const share = (user.percentage / 100) * price;
        userTotalExpenses[user.userId].totalExpense += share;
      });
    });

    return userTotalExpenses;
  }
  calculateDebts() {
    let userDebts: any[] = [];
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
            
            const existingUserIndex = userDebts.findIndex(debt => debt.userId === paidBy);

            if (existingUserIndex !== -1) {
              // User already exists, check if the debts.user exists
              const existingDebtorIndex = userDebts[existingUserIndex].debts.findIndex((debt:any) => debt.userId === debtor);

              if (existingDebtorIndex !== -1) {
                // Debtor already exists, update the amount
                userDebts[existingUserIndex].debts[existingDebtorIndex].amount += amount;
              } else {
                // Debtor doesn't exist, add a new debt
                userDebts[existingUserIndex].debts.push({ userId: debtor, amount: amount });
              }
            } else {
              // User doesn't exist, add a new entry
              userDebts.push({ userId: paidBy, debts: [{ userId: debtor, amount: amount }] });
            }
          }
      
      });
    });
    return userDebts;
  }


}
