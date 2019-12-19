import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BranchService } from '../../../services/branch.service';
import { BranchModel } from '../../../models/branch.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-branch',
  templateUrl: './edit-branch.component.html',
  styleUrls: ['./edit-branch.component.css']
})
export class EditBranchComponent implements OnInit {
  loading: boolean;
  error: string;
  form: FormGroup;
  branch: BranchModel;

  constructor(
    private branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((param: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = param['id'];
      this.branchService.getBranch(id).subscribe(
        (resData: any) => {
          this.branch = resData;
          this.form = new FormGroup({
            branch: new FormControl(this.branch.branchName, {
              validators: [Validators.required]
            }),
            address: new FormControl(this.branch.address, {
              validators: [Validators.required, Validators.minLength(10)]
            }),
            email: new FormControl(this.branch.email, {
              validators: [Validators.required, Validators.email]
            }),
            phone: new FormControl(this.branch.phone, {
              validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
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

  editBranch() {
    if (this.form.valid) {
      this.loading = true;
      const branch = {
        _id: this.branch._id,
        branchName: this.form.value.branch,
        address: this.form.value.address,
        email: this.form.value.email,
        phone: this.form.value.phone
      };
      this.branchService.editBranch(branch).subscribe(
        (resData: any) => {
          this.location.back();
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
