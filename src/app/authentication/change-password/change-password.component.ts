import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EnvVar } from '../../shared/config';
import { EncryptService } from '../../encrypt.service';
import { Validator } from '../../shared/validators';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;
  error: string;

  constructor(private httpService: HttpService,
              private encryptService: EncryptService,
              private formBuilder: FormBuilder,
              private validator: Validator) { }

  ngOnInit() {
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
  }

  changePassword() {
    if (this.form.valid && !this.form.hasError('invalidPassword')) {

      this.error = null;

      const data = {
        api: 'changePassword',
        data: {
          email: JSON.parse(localStorage.getItem('userData')).email,
          password : this.encryptService.encrypt(this.form.value.oldPassword, EnvVar.encKey),
          newPassword : this.encryptService.encrypt(this.form.value.password, EnvVar.encKey)
        }
      };
      this.httpService.httpPostAuth(data)
      .subscribe(
        (resData: any) => {
          this.error = null;
          this.form.reset();
        },
        (errorMessage: any) => {
          this.error = errorMessage;
        }
      );
    } else {
      this.error = 'Please Fill all The Fields Correctly';
    }
  }
}
