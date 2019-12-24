import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './http.service';
import { throwError } from 'rxjs';
import { LectureModel } from '../models/lecture.model';

@Injectable({
  providedIn: 'root'
})
export class LectureService {
  lectureSearchData: any = {
    branch: '',
    course: '',
    batch: '',
    subject: ''
  };

  constructor(private httpService: HttpService) {}

  getLecture(id: string) {
    const data = { api: 'getLecture', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getLecturesForStudent(course: string, batch: string, subject: string) {
    const data = { api: 'getLecturesForStudent', data: { course, batch, subject } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getLectureForEditing(id: string) {
    const data = { api: 'getLectureForEditing', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getLectures(lectureSearchData: any) {
    const data = { api: 'getLectures', data: lectureSearchData };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  addLecture(lecture: any) {
    const data = { api: 'newLecture', data: lecture };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  editLecture(lecture: LectureModel) {
    const data = { api: 'editLecture', data: lecture };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  deleteLecture(id: string) {
    const data = { api: 'deleteLecture', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  newLectureContents(contents: FormData) {
    const data = { api: 'newLectureContents', data: contents };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getLectureContent(id: string) {
    const data = { api: 'getLectureContent', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getLectureContents(id: string) {
    const data = { api: 'getLectureContents', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  deleteLectureContent(id: string) {
    const data = { api: 'deleteLectureContent', data: { public_id: id } };
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
