import { Component, OnInit } from '@angular/core';

import { AuthService, UserData } from './authentication/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Class Management';

  loading: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.loading = true;
    const userData: UserData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      this.loading = false;
      return;
    }

    this.authService.autoLogin()
    .subscribe(
      resData => {
        this.loading = false;
        this.authService.loadUser(userData);
      },
      errorMessage => {
        this.loading = false;
        this.router.navigate(['/login'], {relativeTo: this.route});
      }
    );
  }
}
