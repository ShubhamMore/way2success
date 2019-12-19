import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AuthService } from '../authentication/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public httpPost(data: any): any {
    return this.http.post(environment.backend + data.api, data.data).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        let msg = 'SOMETHING BAD HAPPENED';
        if (err.error) {
          if (typeof err.error === 'object') {
            msg = `Can\'t Reach Server.., Please Try Again`;
          } else {
            msg = err.error;
          }
        }
        return throwError(msg);
      })
    );
  }

  public httpPostAuth(data: any): any {
    let token = '';
    if (localStorage.getItem('userData')) {
      token = 'Bearer ' + JSON.parse(localStorage.getItem('userData'))._token;
    }
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(environment.backend + data.api, data.data, { headers }).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(err => {
        console.log(err);
        let msg = 'SOMETHING BAD HAPPENED';
        if (err.error) {
          if (err.error.error === 'Please authenticate.') {
            this.authService.removeUser();
            this.router.navigate(['/login'], {
              relativeTo: this.route,
              queryParams: { status: 'false' }
            });
          } else if (typeof err.error === 'object') {
            msg = `Can\'t Reach Server.., Please Try Again`;
          } else {
            msg = err.error;
          }
        }
        return throwError(msg);
      })
    );
  }
}
