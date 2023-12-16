import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CostsService {

  constructor() { }

  // Zamenjat szi backendm
  expenses = [ 
    { expenseName: 'Gas money', 
      paidBy: 0, 
      price: 43.3, 
      date: '2. 1. 2024', 
      users: [ {name: 0, percentage: 40}, {name: 1, percentage: 60} ], 
      description: 'Lorem ipsum ' },

    { expenseName: 'Lunch at lunch place', 
      paidBy: 1, 
      price: 50.44, 
      date: '3. 2. 2022', 
      users: [ {name: 0, percentage: 50}, {name: 1, percentage: 50} ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' },

    { expenseName: 'Lunch at lunch place2', 
      paidBy: 1, 
      price: 503.44, 
      date: '3. 2. 2022', 
      users: [ {name: 0, percentage: 50}, {name: 1, percentage: 50} ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet tincidunt purus at ornare. elit. Praesent aliquet tincidunt purus at ornare. ' },

    { expenseName: 'Lunch at lunch place3', 
      paidBy: 1, 
      price: 210.44, 
      date: '3. 2. 2022', 
      users: [ {name: 0, percentage: 50}, {name: 1, percentage: 50} ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet tincidunt purus at ornare. ' },
  ];

  users = [
    { name: 'Miha' },
    { name: 'Bojan' },

  ];




  getExpenses() {
    return this.expenses;
  }

  addExpense(expenseName: string, paidBy: number, price: number, date: string, users: { name: number; percentage: number }[], description: string) {
    const newExpense = { expenseName, paidBy, price, date, users, description};
    this.expenses.push(newExpense);
  }

  getUsers() {
    return this.users;
  }

  getUser(id: number) {
    return this.users[id].name;
  }

  getUsersLenght() {
    return this.users.length;
  }


}
