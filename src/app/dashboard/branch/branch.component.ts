import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../services/branch.service';
import { BranchModel } from '../../models/branch.model';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  loading: boolean;
  error: string;
  branches: BranchModel[];

  constructor(private branchService: BranchService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    this.branches = [];
    this.branchService.getBranches()
    .subscribe(
      (resData: any) => {
        this.branches = resData;
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  editBranch(id: string) {
    this.router.navigate([id, 'edit'], {relativeTo: this.route});
  }

  deleteBranch(id: string) {

  }
}
