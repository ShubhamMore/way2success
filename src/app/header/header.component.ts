import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from '../authentication/auth/auth.service';
import { User } from '../authentication/auth/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean;
  developmentMode: boolean;
  private userSub: Subscription;
  user: User;

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.isAuthenticated = false;
    this.developmentMode = !environment.production;
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
      this.user = user;
    });
  }

  goToHome() {
    if (!!this.user) {
      if (this.user.userType === 'admin') {
        this.router.navigate(['/admin'], {relativeTo: this.route});
      } else if (this.user.userType === 'faculty') {
        this.router.navigate(['/faculty', this.user._id], {relativeTo: this.route});
      } else if (this.user.userType === 'student') {
        this.router.navigate(['/student', this.user._id], { relativeTo: this.route});
      }
    } else {
      this.router.navigate(['/'], {relativeTo: this.route});
    }
  }

  onLogout() {
    this.authService.logout();
  }

  onLogoutAll() {
    this.authService.logoutAll();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
