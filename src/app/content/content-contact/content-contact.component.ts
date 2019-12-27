import { Component, OnInit } from '@angular/core';
import { ContactModel } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EnquiryService } from '../../services/enquiry.service';

@Component({
  selector: 'app-content-contact',
  templateUrl: './content-contact.component.html',
  styleUrls: ['./content-contact.component.css']
})
export class ContentContactComponent implements OnInit {
  loading: boolean;
  error: string;
  contact: ContactModel;
  form: FormGroup;
  enquirySend: boolean;

  constructor(private contactService: ContactService, private enquiryService: EnquiryService) {}

  ngOnInit() {
    this.loading = true;
    this.enquirySend = false;
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email]
      }),
      phone: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
      }),
      message: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)]
      })
    });
    this.contactService.getContact().subscribe(
      (resData: any) => {
        this.contact = resData;
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  sendEnquiry() {
    if (this.form.valid) {
      const enquiry = {
        name: this.form.value.name,
        email: this.form.value.email,
        phone: this.form.value.phone,
        message: this.form.value.message,
        date: Date()
          .toString()
          .substring(0, 21),
        reply: []
      };
      this.enquiryService.sendEnquiry(enquiry).subscribe(
        (resData: any) => {
          this.enquirySend = true;
          this.form.reset();
        },
        (error: any) => {
          this.error = error;
        }
      );
    }
  }

  cancel() {
    this.enquirySend = false;
  }
}
