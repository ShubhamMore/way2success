import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(private httpService: HttpService) { }

  sendEnquiry(enquiry: any) {
    const data = {api: 'sendEnquiry', data: enquiry};
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getEnquiries() {
    const data = {api: 'getEnquiries', data: {}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  markEnquiryAsSeen(id: string) {
    const data = {api: 'markEnquiryAsSeen', data: {_id: id}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  unseenEnquiries() {
    const data = {api: 'unseenEnquiries', data: {}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getEnquiry(id: string) {
    const data = {api: 'getEnquiry', data: {_id: id}};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  newEnquiry(enquiry: any) {
    const data = {api: 'newEnquiry', data: enquiry};
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  replyEnquiry(reply: any) {
    const data = {api: 'replyEnquiry', data: reply};
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
