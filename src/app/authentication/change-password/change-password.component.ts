import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { EncryptService } from '../../encrypt.service';
import { Validator } from '../../shared/validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;
  loading: boolean;
  error: string;

  constructor(private httpService: HttpService,
              private encryptService: EncryptService,
              private formBuilder: FormBuilder,
              private validator: Validator) { }

  ngOnInit() {
    this.loading = true;
    this.form = this.formBuilder.group({
      oldPassword: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)]
      }),
      confirm_password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(6)]
      })
    }, {
      validators: this.validator.passwordValidator.bind(this)
    });
    this.loading = false;
  }

  changePassword() {
    if (this.form.valid && !this.form.hasError('invalidPassword')) {

      this.loading = true;
      this.error = null;

      const data = {
        api: 'changePassword',
        data: {
          email: JSON.parse(localStorage.getItem('userData')).email,
          password : this.encryptService.encrypt(this.form.value.oldPassword, environment.encKey),
          newPassword : this.encryptService.encrypt(this.form.value.password, environment.encKey)
        }
      };
      this.httpService.httpPostAuth(data)
      .subscribe(
        (resData: any) => {
          this.error = null;
          this.form.reset();
          this.loading = false;
        },
        (errorMessage: any) => {
          this.error = errorMessage;
          this.loading = false;
        }
      );
    } else {
      this.error = 'Please Fill all The Fields Correctly';
    }
  }
}
