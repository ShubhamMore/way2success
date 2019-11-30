import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { CourseModel } from 'src/app/models/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { BranchModel } from 'src/app/models/branch.model';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courses: CourseModel[];
  branches: BranchModel[];
  branch: string;
  loading: boolean;

  noCourses: string;

  error: string;

  constructor(private branchService: BranchService,
              private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    this.branches = [];
    this.courses = [];
    this.branch = this.courseService.courseSearchData.branch;
    this.noCourses = 'Please Select Branch';
    this.branchService.getBranches()
    .subscribe(
      (resData: any) => {
        this.error = null;
        this.branches = resData;
        if (this.branches.length > 0) {
          if (this.branch === '') {
            this.branchChanged(this.branches[0]._id);
          } else {
            this.branchChanged(this.branch);
          }
        }
        this.noCourses = 'Currently No Branches Available, Please Add Branch';
        this.loading = false;
      },
      (errorMessage: any) => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }

  branchChanged(branch: string) {
    if (branch !== '') {
      this.branch = branch;
      this.courseService.courseSearchData.branch = this.branch;
      this.loading = true;
      this.courseService.getCoursesByBranch(branch)
      .subscribe(
        (resData: any) => {
          this.error = null;
          this.courses = [];
          this.courses = resData;
          if (this.courses.length < 1) {
            this.noCourses = 'No Courses Available for this Branch';
          }
          this.loading = false;
        },
        (errorMessage: any) => {
          this.error = errorMessage;
          this.loading = false;
        }
      );
    }
  }

  newcourse() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  editcourse(id: string) {
    console.log(id);
    this.router.navigate([id, 'edit'], {relativeTo: this.route});
  }

  deletecourse(id: string) {
    this.courseService.deleteCourse(id);
    this.ngOnInit();
  }

}