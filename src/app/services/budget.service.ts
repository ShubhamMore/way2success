import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { BudgetModel } from '../models/budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  budgetSearchData = {
    seatchType: '0'
  };

  constructor(private httpService: HttpService) {}

  getBudget(searchData: any) {
    const data = {api: 'getBudget', data: searchData};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  saveBudget(budget: any) {
    const data = {api: 'saveBudget', data: budget};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  editBudget(budget: BudgetModel) {
    const data = {api: 'editBudget', data: budget};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  deleteBudget(id: string) {
    const data = {api: 'deleteBudget', data: {_id: id}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }
}
