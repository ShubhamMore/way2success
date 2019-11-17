import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BudgetService } from 'src/app/services/budget.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { BudgetModel } from 'src/app/models/budget.model';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  budgetForm: FormGroup;

  income: BudgetModel[];
  expence: BudgetModel[];

  months: string[];

  years: string[];

  totalBalance: number;
  totalIncome: number;
  totalExpence: number;

  loading: boolean;

  searchType: string;
  month: string;
  year: string;

  budgetType: string;

  date: string;

  constructor(private budgetService: BudgetService) { }

  ngOnInit() {

    this.loading = true;
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.searchType = this.budgetService.budgetSearchData.seatchType;
    this.income = [];
    this.expence = [];
    this.years = [];
    this.curDate();
    const n: number = +this.date.split('-')[0];
    for (let i = 2015; i <= n; i++) {
      this.years.push(i.toString());
    }

    this.budgetType = '1';

    this.month = this.date.split('-')[1];
    this.year = this.date.split('-')[0];

    this.budgetForm = new FormGroup({
      budgetType: new FormControl('1', {
        validators: [Validators.required]
      }),
      date: new FormControl(this.date, {
        validators: [Validators.required]
      }),
      budgetTitle: new FormControl(null, {
        validators: [Validators.required]
      }),
      amount: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.onSelectSearchType(this.searchType);
    this.loading = false;
  }

  curDate() {
    const date = new Date();
    this.date = date.getFullYear() + '-' + this.zeroAppend(date.getMonth() + 1) + '-' + this.zeroAppend(date.getDate());
  }

  zeroAppend(n: number): string {
    if (n < 10) {
      return ('0' + n).toString();
    }
    return n.toString();
  }

  onSelectSearchType(searchType: string) {
    this.searchType = searchType;
    this.budgetService.budgetSearchData.seatchType = this.searchType;
    if (searchType === '0') {
      this.onSelectMonth(this.month);
    } else if (searchType === '1') {
      this.onSelectYear(this.year);
    } else if (searchType === '2') {
      this.searchBudget({});
    }
  }

  onSelectMonth(month: string) {
    this.month = month;
    this.searchBudget({month: this.month, year: this.year});
  }

  onSelectYear(year: string) {
    this.year = year;
    this.searchBudget({year: this.year});
  }

  searchBudget(searchData: any) {
    this.totalBalance = 0.00;
    this.totalIncome = 0.00;
    this.totalExpence = 0.00;
    this.budgetService.getBudget(searchData)
    .subscribe(
      resData => {
        this.income = resData.income;
        this.expence = resData.expence;
        let len;
        // tslint:disable-next-line: no-conditional-assignment
        if ((len = this.income.length) > 0) {
          for (let i = 0; i < len; i++) {
              this.totalIncome += parseFloat(this.income[i].amount);
          }
        }
        // tslint:disable-next-line: no-conditional-assignment
        if ((len = this.expence.length) > 0) {
          for (let i = 0; i < len; i++) {
              this.totalExpence += parseFloat(this.expence[i].amount);
          }
        }
        this.totalBalance = this.totalIncome - this.totalExpence;

        this.loading = false;
      },
      errorMessage => {
      }
    );
  }

  onSelectbudgetType() {
    this.budgetType = this.budgetForm.value.budgetType;
  }

  saveBudget() {
    if (!this.budgetForm.valid) {
      return;
    }

    const budget = {
      title: this.budgetForm.value.budgetTitle,
      amount: this.budgetForm.value.amount,
      type: this.budgetForm.value.budgetType,
      date: this.budgetForm.value.date
    };

    this.budgetService.saveBudget(budget)
    .subscribe(
      resData => {
        this.budgetForm.reset({budgetTitle: null, amount: null});
        this.onSelectSearchType(this.searchType);
      },
      errorMessage => {
      }
    );
  }

  deleteBudget(id: string) {
    this.budgetService.deleteBudget(id)
    .subscribe(
      resData => {
        this.onSelectSearchType(this.searchType);
      },
      errorMessage => {
      }
    );
  }
}
