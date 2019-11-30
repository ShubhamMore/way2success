import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { Location } from '@angular/common';
import { ContactModel } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  loading: boolean;
  error: string;
  contact: ContactModel;
  numbers: string[];
  form: FormGroup;
  noNumberErr: boolean;

  constructor(private contactService: ContactService,
              private location: Location) { }

  ngOnInit() {
    this.loading = true;
    this.noNumberErr = false;
    this.numbers = [];
    this.form = new FormGroup({
      address: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      })
    });
    this.contactService.getContact()
    .subscribe(
      (resData: any) => {
        this.contact = resData;
        if (this.contact) {
          this.numbers = this.contact.numbers;
          this.form.patchValue({
            address: this.contact.address,
            email: this.contact.email
          });
        }
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  addPhone() {
    if (this.form.controls.phone.valid) {
      const phone = this.form.value.phone;
      this.numbers.push(phone);
      if (this.numbers.length > 0) {
        this.noNumberErr = false;
      }
      this.form.patchValue({phone: null});
    }
  }

  deletePhone(i: number) {
    this.numbers.splice(i, 1);
    if (this.numbers.length < 1) {
      this.noNumberErr = true;
    }
  }

  saveContact() {
    if (this.numbers.length < 1) {
      this.noNumberErr = true;
      return;
    }
    if (this.form.controls.address.valid && this.form.controls.email.valid) {
      const contact: any = {
        address: this.form.value.address,
        email: this.form.value.email,
        numbers: this.numbers
      };
      if (this.contact) {
        contact._id = this.contact._id;
      }
      this.loading = true;
      this.contactService.saveContact(contact)
      .subscribe(
        (resdata: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }
}
