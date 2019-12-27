import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StudentModel } from 'src/app/models/student.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReceiptService } from 'src/app/services/receipt.service';

@Component({
  selector: 'app-student-payment',
  templateUrl: './student-payment.component.html',
  styleUrls: ['./student-payment.component.css']
})
export class StudentPaymentComponent implements OnInit {
  loading: boolean;
  amount: number;
  lateFee: number;
  form: FormGroup;
  chequeDetailsForm: FormGroup;
  student: StudentModel;
  studentMetaData: any;
  feeType: string;
  paymentMode: string;
  error: string;
  date: string;

  constructor(
    private studentService: StudentService,
    private receiptService: ReceiptService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.loading = true;
    this.feeType = '0';
    this.amount = this.lateFee = 0;
    this.curDate();
    this.route.params.subscribe(param => {
      // tslint:disable-next-line: no-string-literal
      const id = param['id'];
      this.studentService.getStudentForPayment(id).subscribe(
        (resData: any) => {
          this.student = resData.student;
          this.studentMetaData = resData.studentMetaData;
          this.amount = +this.studentMetaData.totalFees + this.lateFee;
          this.form = new FormGroup({
            feeType: new FormControl(this.feeType, {
              validators: [Validators.required]
            }),
            date: new FormControl(this.date, {
              validators: [Validators.required]
            }),
            fee: new FormControl(this.amount, {
              validators: [Validators.required, this.feeValidator.bind(this)]
            }),
            lateFee: new FormControl('0', {
              validators: [Validators.required, this.lateFeeValidator.bind(this)]
            }),
            paymentMode: new FormControl('cash', {
              validators: [Validators.required]
            }),
            description: new FormControl(null, {
              validators: [Validators.required]
            })
          });
          this.chequeDetailsForm = new FormGroup({
            chequeNumber: new FormControl(null, {
              validators: [Validators.required]
            }),
            chequeDate: new FormControl(null, {
              validators: [Validators.required]
            }),
            bankName: new FormControl(null, {
              validators: [Validators.required]
            }),
            branch: new FormControl(null, {
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
    });
  }

  curDate() {
    const date = new Date();
    this.date =
      date.getFullYear() +
      '-' +
      this.zeroAppend(date.getMonth() + 1) +
      '-' +
      this.zeroAppend(date.getDate());
  }

  zeroAppend(n: number): string {
    if (n < 10) {
      return ('0' + n).toString();
    }
    return n.toString();
  }

  changeFeeType(feeType: string) {
    if (feeType === '0') {
      this.form.patchValue({ fee: this.studentMetaData.totalFees });
      this.amount = +this.studentMetaData.totalFees;
      return;
    }
    this.form.patchValue({ fee: 1000 });
    this.amount = 1000;
  }

  changeFeeAmount(fee: string) {
    this.amount = +fee + this.lateFee;
  }

  addLateFeeAmount(lateFee: string) {
    this.lateFee = +lateFee;
  }

  changePaymentMode() {
    this.paymentMode = this.form.value.paymentMode;
  }

  payFees() {
    if (this.form.valid) {
      if (this.paymentMode === 'cheque' && !this.chequeDetailsForm.valid) {
        return;
      }
      this.loading = true;
      let chequeDetails: {
        chequeNumber: string;
        chequeDate: string;
        bankName: string;
        branch: string;
      } = { chequeNumber: '', chequeDate: '', bankName: '', branch: '' };
      if (this.paymentMode === 'cheque') {
        chequeDetails = {
          chequeNumber: this.chequeDetailsForm.value.chequeNumber,
          chequeDate: this.chequeDetailsForm.value.chequeDate,
          bankName: this.chequeDetailsForm.value.bankName,
          branch: this.chequeDetailsForm.value.branch
        };
      }
      const receipt = {
        student: this.student._id,
        branch: this.student.branch,
        course: this.student.course,
        batch: this.student.batch,
        date: this.form.value.date,
        feeType: this.form.value.feeType,
        amount: this.amount + this.lateFee,
        paymentMode: this.form.value.paymentMode,
        description: this.form.value.description,
        chequeNumber: chequeDetails.chequeNumber,
        chequeDate: chequeDetails.chequeDate,
        bankName: chequeDetails.bankName,
        bankBranch: chequeDetails.branch
      };
      this.receiptService.addReceipt(receipt).subscribe(
        (resData: any) => {
          this.form.reset();
          this.router.navigate(['/admin', 'student', this.student._id, 'receipt', resData._id], {
            relativeTo: this.route
          });
          this.loading = false;
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    } else {
    }
  }

  cancel() {
    this.location.back();
  }

  feeValidator(control: FormControl): { [s: string]: boolean } {
    const n = +control.value;
    if (n < 1000) {
      return { invalidFee: true };
    }
    return null;
  }

  lateFeeValidator(control: FormControl): { [s: string]: boolean } {
    const n = +control.value;
    if (n < 0) {
      return { invalidLateFee: true };
    }
    return null;
  }

  onErrorClose() {
    this.error = null;
  }
}
