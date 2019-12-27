import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  attendanceSearchData: any = {
    date: null,
    branch: '',
    courseType: '0',
    course: '',
    batch: '',
    subject: ''
  };

  constructor(private httpService: HttpService) {}

  getStudents(course: string, batch: string, subject: string, date: string) {
    const data = {
      api: 'getStudentsForAttendance',
      data: { course, batch, subject, date }
    };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  saveAttendance(attendance: any) {
    const data = { api: 'saveAttendance', data: attendance };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getAttendance(
    month: string,
    year: string,
    branch: string,
    course: string,
    batch: string,
    subject: string,
    student: string
  ) {
    const data = {
      api: 'getAttendance',
      data: { month, year, branch, course, batch, subject, student }
    };
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
