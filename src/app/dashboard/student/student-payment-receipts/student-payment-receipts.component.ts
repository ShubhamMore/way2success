import { Component, OnInit } from '@angular/core';
import { ReceiptService } from '../../../services/receipt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ReceiptModel } from '../../../models/receipt.model';

@Component({
  selector: 'app-student-payment-receipts',
  templateUrl: './student-payment-receipts.component.html',
  styleUrls: ['./student-payment-receipts.component.css']
})
export class StudentPaymentReceiptsComponent implements OnInit {

  loading: boolean;
  error: string;
  receipts: ReceiptModel[];

  constructor(private receiptService: ReceiptService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.loading = true;
    this.receipts = [];
    this.route.params
    .subscribe((param) => {
      // tslint:disable-next-line: no-string-literal
      const id = param['id'];
      this.receiptService.getAllReceipts(id)
      .subscribe(
        (resdata: any) => {
          this.receipts = resdata;
          this.loading = false;
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    });
  }

  showReceipt(id: string) {
    this.router.navigate([id], {relativeTo: this.route});
  }

  deleteReceipt(id: string) {
    this.loading = true;
    this.receiptService.deleteReceipt(id)
    .subscribe(
      (resData: any) => {
        this.ngOnInit();
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  cancel() {
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }
}
