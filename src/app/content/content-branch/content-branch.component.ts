import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../services/branch.service';

@Component({
  selector: 'app-content-branch',
  templateUrl: './content-branch.component.html',
  styleUrls: ['./content-branch.component.css']
})
export class ContentBranchComponent implements OnInit {
  loading: boolean;
  error: string;
  courseType: string;
  branches: any[];

  constructor(private branchService: BranchService) {}

  ngOnInit() {
    this.loading = true;
    this.courseType = '0';
    this.branches = [];
    this.branchService.getBranchesAndCoursesForContent().subscribe(
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

  changeCourseType(courseType: string) {
    this.courseType = courseType;
  }
}
