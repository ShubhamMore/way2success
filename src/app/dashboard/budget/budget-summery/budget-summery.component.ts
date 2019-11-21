import { Component, OnInit } from '@angular/core';
import { BudgetService } from 'src/app/services/budget.service';
import { BudgetModel } from 'src/app/models/budget.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-budget-summery',
  templateUrl: './budget-summery.component.html',
  styleUrls: ['./budget-summery.component.css']
})
export class BudgetSummeryComponent implements OnInit {

  statement: BudgetModel[];

  totalBalance: number;
  totalIncome: number;
  totalExpence: number;

  loading: boolean;
  error: string;

  statementFrom: string;
  statementTo: string;

  month: string;
  year: string;
  searchType: string;

  constructor(private budgetService: BudgetService,
              private location: Location) { }

  ngOnInit() {

    this.loading = true;

    this.searchType = this.budgetService.budgetSearchData.seatchType;
    this.month = this.budgetService.budgetSearchData.month;
    this.year = this.budgetService.budgetSearchData.year;

    this.totalBalance = 0.00;
    this.totalIncome = 0.00;
    this.totalExpence = 0.00;

    if (this.searchType === '0') {
      this.searchBudget({month: this.month, year: this.year});
    } else if (this.searchType === '1') {
      this.searchBudget({year: this.year});
    } else if (this.searchType === '2') {
      this.searchBudget({});
    }
  }


  searchBudget(searchData: any) {
    this.budgetService.getBudgetSummery(searchData)
    .subscribe(
      (resData: any) => {
        this.statement = resData;
        if (this.statement.length > 0) {
          const len: number = this.statement.length;
          this.statementFrom = this.statement[0].date;
          this.statementTo = this.statement[len - 1].date;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              if (this.statement[i].type === '1') {
                this.totalIncome += parseFloat(this.statement[i].amount);
              } else {
                this.totalExpence += parseFloat(this.statement[i].amount);
              }
            }
          }
          this.totalBalance = this.totalIncome - this.totalExpence;
        }
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  print() {
    window.print();
  }

  cancel() {
    this.location.back();
  }
}
