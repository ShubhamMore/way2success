import { CourseModel, BatchModel } from '../models/course.model';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class CourseService {
  courseSearchData = {
    branch: '',
    courseType: '0'
  };

  constructor(private httpService: HttpService) {}

  getCourses() {
    const data = { api: 'getCourses', data: {} };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getBranchesAndCourses() {
    const data = { api: 'getBranchesAndCourses', data: {} };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getCoursesByBranch(branch: string, courseType: string) {
    const data = { api: 'getCoursesByBranch', data: { branch, courseType } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getCourse(id: string) {
    const data = { api: 'getCourse', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getCourseForEditing(id: string) {
    const data = { api: 'getCourseForEditing', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  addCourse(Course: any) {
    const data = { api: 'newCourse', data: Course };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  editCourse(Course: any) {
    const data = { api: 'editCourse', data: Course };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  deleteCourse(id: string) {
    // this.Courses.splice(id, 1);
  }

  deactivateCourse(id: string) {
    const data = { api: 'deactivateCourse', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  activateCourse(id: string) {
    const data = { api: 'activateCourse', data: { _id: id } };
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
