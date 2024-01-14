import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CostsService } from '../../services/costs.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashborad',
  templateUrl: './dashborad.component.html',
  styleUrls: ['./dashborad.component.css']
})
export class DashboradComponent implements OnInit, AfterViewInit {
  userExpensesChart: any;
  name:string = "";
  userTotalExpenses: { userId: number; totalExpense: number }[] = [];

  constructor(private costsService: CostsService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadExpensesAndCreateChart();
  }

  ngAfterViewInit(): void {
    // Chart creation can remain in ngAfterViewInit
    this.createChart();
  }

  loadExpensesAndCreateChart(): void {
    this.userTotalExpenses = this.costsService.calculateTotalExpenses();
    this.createChart();
  }

  createChart(): void {
    const userNames = this.costsService.users.map(user => user.name);

    this.userExpensesChart = new Chart('userExpensesChart', {
      type: 'pie',
      data: {
        labels: userNames,
        datasets: [
          {
            data: this.userTotalExpenses.map(user => user.totalExpense),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  getUserName(id: number): string | undefined {
    return this.costsService.getUserName(id);
  }


  updateView(): void {
    this.cdr.detectChanges();
  }
}
