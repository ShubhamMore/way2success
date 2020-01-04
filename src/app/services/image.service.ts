import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpService } from './http.service';
import { throwError } from 'rxjs';
import { ImageModel } from '../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  imageSearchData: any = {
    category: ''
  };

  constructor(private httpService: HttpService) {}

  getImageCategories() {
    const data = { api: 'getImageCategories', data: {} };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getImageCategoriesForContent() {
    const data = { api: 'getImageCategoriesForContent', data: {} };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  addCategory(category: string) {
    const data = { api: 'newCategory', data: { category } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  deleteCategory(id: string) {
    const data = { api: 'deleteCategory', data: { _id: id } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getImages() {
    const data = { api: 'getImage', data: {} };
    return this.httpService.httpPost(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  getImagesByCategory(category: string) {
    const data = { api: 'getImagesByCategory', data: { category } };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  addImages(images: FormData) {
    const data = { api: 'newImages', data: images };
    return this.httpService.httpPostAuth(data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );
  }

  deleteImage(id: string) {
    const data = { api: 'deleteImage', data: { public_id: id } };
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
