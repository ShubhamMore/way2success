import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ExamModel } from '../models/exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  examSearchData: any = {
    branch: '',
    courseType: '0',
    course: '',
    batch: '',
    subject: '',
    year: null
  };

  constructor(private httpService: HttpService) {}

  getStudents(course: string, batch: string, subject: string) {
    const data = {
      api: 'getStudentsForExam',
      data: { course, batch, subject }
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

  saveExam(exam: any) {
    const data = { api: 'saveExam', data: exam };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getExams(course: string, batch: string, subject: string, year: string) {
    const data = { api: 'getExams', data: { course, batch, subject, year } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getExamsPerformance(
    month: string,
    year: string,
    branch: string,
    course: string,
    batch: string,
    subject: string,
    student: string
  ) {
    const data = {
      api: 'getExamsPerformance',
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

  getExam(id: string) {
    const data = { api: 'getExam', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  editExam(id: string, exam: ExamModel) {
    const data = { api: 'editExam', data: { _id: id, exam } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  deleteExam(id: string) {
    const data = { api: 'deleteExam', data: { _id: id } };
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
