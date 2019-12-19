import { Component, OnInit } from '@angular/core';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { EnquiryModel } from 'src/app/models/enquiry.model';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.css']
})
export class EnquiryComponent implements OnInit {
  loading: boolean;
  enquiries: EnquiryModel[];
  error: string;

  constructor(private enquiryService: EnquiryService) {}

  ngOnInit() {
    this.loading = true;
    this.enquiries = [];
    this.enquiryService.getEnquiries().subscribe(
      (resData: any) => {
        this.enquiries = resData;
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  limitData(data: string, limit: number = 25) {
    if (data.length >= limit) {
      const newdata = [];
      data.split(' ').reduce((acc, cur) => {
        if (acc + cur.length <= limit) {
          newdata.push(cur);
        }
        return acc + cur.length;
      }, 0);
      return `${newdata.join(' ')}...`;
    }
    return data;
  }

  onErrorClose() {
    this.error = null;
  }
}
