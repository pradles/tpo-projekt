import {Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CostsService implements OnInit{
  private name: Subject<string> = new Subject<string>();
  constructor(private httpClient: HttpClient,private router:ActivatedRoute) {

  }

  ngOnInit(): void {

  }



  // Zamenjat szi backendm
  private createdRooms: string[] = [];

  expenses:Array<{
    "id": number;
    "expenseName": string;
    "paidBy": number;
    "price": number;
    "date": string;
    "users": any[];
    "description": string;
  }> = [];

  users:Array<{
    "id":number;
    "name":string;
  }> = [];


  setData(data:string){
    console.log(data)
    this.name.next(data)
    this.getExpenses(data)
    this.getUsers(data)
  }


  /**
   * Get expenses
   * @returns all the expenses
   */
  getExpenses(name:string) {
    var subject = new Subject<any[]>();
    this.httpClient.post<{message:string,expanses:any[]}>('http://localhost:3000/expenses',{name:name})
        .subscribe((response) => {
          this.expenses=[...response["expanses"]]
          subject.next([...response["expanses"]])
        });
    return subject
  }

  getUsers(name:string) {
    var subject = new Subject<any[]>();
    this.httpClient.post<{message:string,users:any[]}>('http://localhost:3000/users',{name:name})
        .subscribe((response) => {
          this.users=[...response["users"]]
          subject.next([...response["users"]])
        });
    return subject;
  }

  addExpenseService(newExpense:any,name:string) {
    this.httpClient.post<any>('http://localhost:3000/addExpenses',{name:name,expense:newExpense})
        .subscribe((response) => {

        });
  }

  addUserService(name:string) {
    this.httpClient.post<any>('http://localhost:3000/addUser',{name:name,users:this.users})
        .subscribe((response) => {

        });
  }

  editExpenseService(name:string) {
    this.httpClient.post<any>('http://localhost:3000/editExpense',{name:name,expense:this.expenses})
        .subscribe((response) => {

        });
  }

  /**
   * Returns 1 expense based on the id
   * @param providedExpenseId - id of required expense
   * @returns - 1 expense based on the id
   */
  getExpense(providedExpenseId: number) {
    return this.expenses.find(expense => expense.id === providedExpenseId);
  }

  /**
   * Add new expense
   * @param expenseName - expense name
   * @param paidBy - who paid for it
   * @param price - total price
   * @param date - date "yyyy-MM-dd"
   * @param users - price split between users
   * @param description - description
   * Expense index - incremental
   */
  addExpense(expenseName: string, paidBy: number, price: number, date: string, users: { userId: number; percentage: number }[], description: string,name:string) {
    let paidByInt: number = +paidBy;
    const newIndex = this.expenses.length > 0 ? this.expenses[this.expenses.length - 1].id+1 : 0;
    const newExpense = { id: newIndex, expenseName: expenseName, paidBy: paidByInt, price: price, date: date, users: users, description: description};
    this.expenses.push(newExpense);
    this.addExpenseService(newExpense,name)
  }

  /**
   * Remove expense with provided id
   * @param providedExpenseId - expense id for removal
   */
  removeExpense(providedExpenseId: number,name:string): void {
    const indexToRemove = this.expenses.findIndex(expense => expense.id === providedExpenseId);
    if (indexToRemove === -1) {
      throw new Error(`Expense with ID ${providedExpenseId} not found.`);
    }
    this.expenses.splice(indexToRemove, 1);
    this.editExpenseService(name)
  }

  /**
   * Update expense
   * @param expenseId - what expense to update
   * @param expenseName - expense name
   * @param paidBy - who paid for it
   * @param price - total price
   * @param date - date "yyyy-MM-dd"
   * @param users - price split between users
   * @param description - description
   */
  updateExpense(expenseId: number, expenseName: string, paidBy: number, price: number, date: string, users: { userId: number; percentage: number }[], description: string, name:string) {
    const existingExpenseIndex = this.expenses.findIndex(expense => expense.id === expenseId); //Get expense
    let paidByInt: number = +paidBy; //convert to int
    if (existingExpenseIndex !== -1) {
      // Expense found, update its properties
      this.expenses[existingExpenseIndex] = {
        id: expenseId,
        expenseName: expenseName,
        paidBy: paidByInt,
        price: price,
        date: date,
        users: users,
        description: description
      };
      this.editExpenseService(name)
    } else {
      // Expense not found, you can handle this case as needed
      console.error(`Expense with id ${expenseId} not found.`);
    }
  }

  /**
   * Get expense name
   * @param providedExpenseId - expense id
   * @returns - expense name
   */
  getExpenseName(providedExpenseId: number) {
    return this.expenses.find(expense => expense.id === providedExpenseId)?.expenseName;
  }

  /**
   * Get the sum of all expenses
   * @returns - total price
   */
  getSumExpenses(): number {
    return this.expenses.reduce((total, expense) => total + expense.price, 0);
  }

  /**
   * Add user
   * @param username - provide user name
   */
  addUser(username: string,name:string) {
    const lastUserId = this.users.length > 0 ? this.users[this.users.length - 1].id : -1;
    this.users.push({ id: lastUserId + 1, name: username });
    this.addUserService(name)
  }

  /**
   * Get username for provided id
   * @param id - provided user id
   * @returns - username
   */
  getUserName(id: number): string | undefined {
    const user = this.users.find(user => user.id === id);
    return user ? user.name : undefined;
  }

  /**
   *
   * @returns - users array length
   */
  getUsersLenght() {
    return this.users.length;
  }

  /**
   * Calculate the debt for each user
   * @returns - array for each user that has debtors and his debtors with values
   */
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

  createRoom(roomName: string, roomPassword: string) {
    // Check if the room with the same name already exists
    console.log("Create room")
    return this.httpClient.post<any[]>('http://localhost:3000/createRoom',{
      name:roomName,
      pass:roomPassword
    })
  }



  /**
   * ##################### od nejca #######################################
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
  calculateDebts2() {
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
