import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BranchService } from '../../../services/branch.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

  loading: boolean;
  error: string;
  form: FormGroup;
  constructor(private branchService: BranchService) { }

  ngOnInit() {
    this.loading = true;
    this.form = new FormGroup({
      branch: new FormControl(null, {
        validators: [Validators.required]
      }),
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
    this.loading = false;
  }

  addBranch() {
    if (this.form.valid) {
      this.loading = true;
      const branch = {
        branchName: this.form.value.branch,
        address: this.form.value.address,
        email: this.form.value.email,
        phone: this.form.value.phone
      };
      this.branchService.addBranch(branch)
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

  onErrorClose() {
    this.error = null;
  }

}
