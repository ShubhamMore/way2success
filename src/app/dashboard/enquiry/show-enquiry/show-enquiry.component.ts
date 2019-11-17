import { Component, OnInit } from '@angular/core';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { subscribeOn } from 'rxjs/operators';
import { EnquiryModel } from 'src/app/models/enquiry.model';

@Component({
  selector: 'app-show-enquiry',
  templateUrl: './show-enquiry.component.html',
  styleUrls: ['./show-enquiry.component.css']
})
export class ShowEnquiryComponent implements OnInit {

  loading: boolean;
  enquiry: EnquiryModel;
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

  cancel() {
    this.location.back();
  }

}
