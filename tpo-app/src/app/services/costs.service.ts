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
      price: 100, 
      date: '2. 1. 2024', 
      users: [ {userId: 0, percentage: 40}, {userId: 1, percentage: 60} ], 
      description: 'Lorem ipsum ' },

    { expenseName: 'Lunch at lunch place', 
      paidBy: 1, 
      price: 50.44, 
      date: '3. 2. 2022', 
      users: [ {userId: 0, percentage: 33.3}, {userId: 1, percentage: 33.3}, {userId: 2, percentage: 33.3} ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ' },

    { expenseName: 'Lunch at lunch place2', 
      paidBy: 2, 
      price: 503.44, 
      date: '3. 2. 2022', 
      users: [ {userId: 0, percentage: 30}, {userId: 1, percentage: 50}, {userId: 2, percentage: 20} ],
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquet tincidunt purus at ornare. elit. Praesent aliquet tincidunt purus at ornare. ' },

    { expenseName: 'Lunch at lunch place3', 
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

  addExpense(expenseName: string, paidBy: number, price: number, date: string, users: { userId: number; percentage: number }[], description: string) {
    const newExpense = { expenseName, paidBy, price, date, users, description};
    this.expenses.push(newExpense);
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


}
