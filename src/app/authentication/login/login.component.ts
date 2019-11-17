import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EnvVar } from '../../shared/config';

import { AuthService, AuthResponseData } from '../auth/auth.service';
import { EncryptService } from '../../encrypt.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  // isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router,
              private encryptService: EncryptService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl(null, {
        validators: [Validators.required]
      })
    });
  }

  login() {
    if (!this.form.valid) {
      return;
    }

    const email = this.form.value.email;
    const password = this.encryptService.encrypt(this.form.value.password, EnvVar.encKey);

    let authObs: Observable<AuthResponseData>;

    // this.isLoading = true;

    authObs = this.authService.login(email, password);

    authObs.subscribe(
      resData => {
        // this.isLoading = false;
        if (resData.userType === 'admin') {
          this.router.navigate(['/admin'], { relativeTo: this.route });
        } else if (resData.userType === 'student') {
          this.router.navigate(['/student', resData._id], { relativeTo: this.route });
        } else if (resData.userType === 'faculty') {
          this.router.navigate(['/faculty', resData._id], { relativeTo: this.route });
        } else {
          this.router.navigate(['/login'], { relativeTo: this.route, queryParams: { auth: 'false' }, skipLocationChange: true });
        }
      },
      errorMessage => {
        this.error = errorMessage;
        // this.isLoading = false;
      }
    );

    this.form.reset();
  }

}
