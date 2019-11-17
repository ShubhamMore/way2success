import { Component, OnInit } from '@angular/core';
import { AuthResponseData, AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EncryptService } from '../../encrypt.service';
import { EnvVar } from '../../shared/config';
import { Validator } from '../../shared/validators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  userExist: boolean;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
              private router: Router,
              private encryptService: EncryptService,
              private userService: UserService,
              private formBuilder: FormBuilder,
              private validator: Validator) {}

  ngOnInit() {
    this.userExist = false;
    this.form = this.formBuilder.group({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      userType: new FormControl('', {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
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

  checkUser() {
    if (this.form.controls.email.status === 'VALID') {
      this.userService.checkUser(this.form.value.email)
      .subscribe(
        (resData: any) => {
          this.userExist = resData.exist;
        },
        errorMessage => {
          this.error = errorMessage;
        }
      );
    }
  }

  register() {
    if (!this.form.valid && this.form.hasError('invalidPassword')) {
      this.error = 'Please fill All the fields Correctly..';
      return;
    }

    if (this.userExist) {
      return;
    }

    this.error = null;
    console.log(this.form.value);

    const data = {
      name: this.form.value.name.toLowerCase(),
      userType: this.form.value.userType,
      email: this.form.value.email,
      password: this.encryptService.encrypt(this.form.value.password, EnvVar.encKey)
    };

    let authObs: Observable<AuthResponseData>;

    // this.isLoading = true;

    authObs = this.authService.createUser(data);

    authObs.subscribe(
      resData => {
        console.log(resData);
        // this.isLoading = false;
        this.router.navigate(['/login']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        // this.isLoading = false;
      }
    );

    this.form.reset();
  }

}
