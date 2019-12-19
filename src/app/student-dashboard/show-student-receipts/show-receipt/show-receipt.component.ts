import { Component, OnInit } from '@angular/core';
import { ReceiptService } from '../../../services/receipt.service';
import { ReceiptModel } from '../../../models/receipt.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-receipt',
  templateUrl: './show-receipt.component.html',
  styleUrls: ['./show-receipt.component.css']
})
export class ShowReceiptComponent implements OnInit {
  loading: boolean;
  error: string;
  receipt: ReceiptModel;

  constructor(
    private receiptService: ReceiptService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe(param => {
      // tslint:disable-next-line: no-string-literal
      const id = param['receiptid'];
      this.receiptService.getReceipt(id).subscribe(
        (resdata: any) => {
          this.receipt = resdata;
          this.loading = false;
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    });
  }

  print() {
    window.print();
  }

  cancel() {
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }
}
