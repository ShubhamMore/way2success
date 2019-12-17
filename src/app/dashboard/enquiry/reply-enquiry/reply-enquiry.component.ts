import { Component, OnInit } from '@angular/core';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { EnquiryModel } from 'src/app/models/enquiry.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reply-enquiry',
  templateUrl: './reply-enquiry.component.html',
  styleUrls: ['./reply-enquiry.component.css']
})
export class ReplyEnquiryComponent implements OnInit {

  loading: boolean;
  enquiry: EnquiryModel;
  form: FormGroup;
  error: string;
  constructor(private enquiryService: EnquiryService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.loading = true;
    this.route.params
    .subscribe(
      (param: Params) => {
        // tslint:disable-next-line: no-string-literal
        const id = param['id'];
        this.enquiryService.getEnquiry(id)
        .subscribe(
          (resDara: any) => {
            this.enquiry = resDara;
            this.form = new FormGroup({
              subject: new FormControl(null, {
                validators: [Validators.required]
              }),
              message: new FormControl(null, {
                validators: [Validators.required]
              })
            });
            this.loading = false;
          },
          (error: any) => {
            this.error = error;
            this.loading = false;
          }
        );
      }
    );
  }

  sendReply() {
    if (this.form.valid) {
      this.loading = true;
      const reply = {
        enquiry: this.enquiry._id,
        subject: this.form.value.subject,
        message: this.form.value.message,
        date: Date().toString().substring(0, 21)
      };
      this.enquiryService.replyEnquiry(reply)
      .subscribe(
        (resData: any) => {
          this.form.reset();
          this.loading = false;
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }

  cancel() {
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }
}
