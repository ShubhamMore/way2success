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
  courseType: string;

  error: string;

  constructor(
    private branchService: BranchService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.branches = [];
    this.courses = [];
    this.branch = this.courseService.courseSearchData.branch;
    this.courseType = this.courseService.courseSearchData.courseType;
    this.noCourses = 'Please Select Branch';
    this.branchService.getBranches().subscribe(
      (resData: any) => {
        this.error = null;
        this.branches = resData;
        if (this.branches.length > 0) {
          if (this.branch === '') {
            this.branchChanged(this.branches[0]._id);
          } else {
            this.branchChanged(this.branch);
          }
        } else {
          this.noCourses = 'Currently No Branches Available, Please Add Branch';
          this.loading = false;
        }
      },
      (errorMessage: any) => {
        this.error = errorMessage;
        if (this.error === 'Error: No Branch Found') {
          this.error = null;
          this.noCourses = 'Currently No Branches Available, Please Add Branch';
        }
        this.loading = false;
      }
    );
  }

  courseTypeChanged(courseType: string) {
    if (courseType !== '') {
      this.courseType = courseType;
      this.courseService.courseSearchData.courseType = this.courseType;
      this.searchCourse(this.branch, courseType);
    }
  }

  branchChanged(branch: string) {
    if (branch !== '') {
      this.branch = branch;
      this.courseService.courseSearchData.branch = this.branch;
      this.loading = true;
      this.searchCourse(branch, this.courseType);
    }
  }

  searchCourse(branch: string, courseType: string) {
    this.courseService.getCoursesByBranch(branch, courseType).subscribe(
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

  newCourse() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  editCourse(id: string) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  deleteCourse(id: string) {
    window.alert(`You can\'t Delete the course due to Data Protection..`);
  }

  deactivateCourse(id: string) {
    const confirm = window.confirm('Do you really want to Deactivate tis Course??');
    if (confirm) {
      this.loading = true;
      this.courseService.deactivateCourse(id).subscribe(
        (resdata: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }

  activateCourse(id: string) {
    const confirm = window.confirm('Do you want to Activate tis Course Again..?');
    if (confirm) {
      this.loading = true;
      this.courseService.activateCourse(id).subscribe(
        (resdata: any) => {
          this.ngOnInit();
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
