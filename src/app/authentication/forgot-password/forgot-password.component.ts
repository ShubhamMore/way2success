import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  emailSend: boolean;
  loading: boolean;
  error: string;

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit() {
    this.loading = true;
    this.emailSend = false;
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      })
    });
    this.loading = false;
  }

  forgotPassword() {
    if (this.form.valid) {
      this.loading = true;
      this.error = null;
      this.emailSend = null;
      const data = {
        api: 'forgotPassword',
        data: {
          email: this.form.value.email
        }
      };

      this.httpService.httpPost(data).subscribe(
        (resData: any) => {
          this.emailSend = true;
          this.loading = false;
        },
        (errorMessage: any) => {
          this.error = errorMessage;
          this.loading = false;
        }
      );
    } else {
      this.error = 'Please Enter Email';
    }
  }

  onErrorClose() {
    this.error = null;
  }
}
