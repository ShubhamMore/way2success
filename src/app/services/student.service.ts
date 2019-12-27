import { StudentModel } from '../models/student.model';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class StudentService {
  constructor(private httpService: HttpService) {}

  studentSearchData = {
    branch: '',
    courseType: '0',
    searchType: '0',
    course: '',
    batch: '',
    subject: '',
    student: null,
    studentType: '0'
  };

  getStudents(searchData: any) {
    const data = { api: 'getStudents', data: searchData };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getStudent(id: string) {
    const data = { api: 'getStudent', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getStudentForPayment(id: string) {
    const data = { api: 'getStudentForPayment', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getStudentForEditing(id: string) {
    const data = { api: 'getStudentForEditing', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getStudentDataForMedia(id: string) {
    const data = { api: 'getStudentDataForMedia', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getStudentDataForLecture(id: string) {
    const data = { api: 'getStudentDataForLecture', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getStudentSubjects(id: string) {
    const data = { api: 'getStudentSubjects', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  addStudent(student: any) {
    const data = { api: 'newStudent', data: student };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  editStudent(student: StudentModel) {
    const data = { api: 'editStudent', data: student };
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
