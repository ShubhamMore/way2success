import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './http.service';
import { throwError } from 'rxjs';
import { MediaModel } from '../models/MediaModel';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  mediaSearchData: any = {
    branch: '',
    course: '',
    batch: '',
    subject: ''
  };

  constructor(private httpService: HttpService) {}

  getAllMedia(media: any) {
    const data = { api: 'getAllMedia', data: media };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getMedia(id: string) {
    const data = { api: 'getMedia', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getMediaForStudent(date: string, course: string, batch: string, subject: string) {
    const data = {
      api: 'getMediaForStudent',
      data: { date, course, batch, subject }
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

  getMediaforEditing(id: string) {
    const data = { api: 'getMediaforEditing', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  addMedia(media: FormData) {
    const data = { api: 'newMedia', data: media };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  editMedia(media: MediaModel) {
    const data = { api: 'editMedia', data: media };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  deleteMedia(id: string) {
    const data = { api: 'deleteMedia', data: { _id: id } };
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
