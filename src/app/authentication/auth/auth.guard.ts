import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // tslint:disable-next-line: max-line-length
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth && user.userType === 'admin') {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }

  // tslint:disable-next-line: max-line-length
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.canActivate(route, state);
  }
}

@Injectable({providedIn: 'root'})
export class FacultyAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // tslint:disable-next-line: max-line-length
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth && user.userType === 'faculty') {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }

  // tslint:disable-next-line: max-line-length
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.canActivate(route, state);
  }
}

@Injectable({providedIn: 'root'})
export class StudentAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // tslint:disable-next-line: max-line-length
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth && user.userType === 'student') {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }

  // tslint:disable-next-line: max-line-length
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.canActivate(route, state);
  }
}

@Injectable({providedIn: 'root'})
export class ChangePassswordGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // tslint:disable-next-line: max-line-length
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth && (user.userType === 'admin' || user.userType === 'student' || user.userType === 'faculty')) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }

  // tslint:disable-next-line: max-line-length
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.canActivate(route, state);
  }
}

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // tslint:disable-next-line: max-line-length
  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map(user => {
        if (!localStorage.getItem('userData')) {
          this.authService.removeUser();
        }
        const isAuth = !!user;
        if (!isAuth) {
          return true;
        } else if (user.userType === 'admin') {
          return this.router.createUrlTree(['/admin']);
        } else if (user.userType === 'student') {
          return this.router.createUrlTree(['/student', user._id]);
        } else if (user.userType === 'faculty') {
          return this.router.createUrlTree(['/faculty']);
        } else {
          return this.router.createUrlTree(['/']);
        }
      })
      // tap(isAuth => {
      //   if (!isAuth) {
      //     this.router.navigate(['/auth']);
      //   }
      // })
    );
  }
}
