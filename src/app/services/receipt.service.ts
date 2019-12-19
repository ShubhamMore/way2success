import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './http.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  constructor(private httpService: HttpService) {}

  addReceipt(receipt: any) {
    const data = { api: 'newReceipt', data: receipt };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getAllReceipts(student: string) {
    const data = { api: 'getAllReceipts', data: { student } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getReceipt(receipt: string) {
    const data = { api: 'getReceipt', data: { _id: receipt } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  deleteReceipt(receipt: string) {
    const data = { api: 'deleteReceipt', data: { _id: receipt } };
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
