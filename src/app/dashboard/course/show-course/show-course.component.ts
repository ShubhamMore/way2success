import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { CourseModel, BatchModel } from 'src/app/models/course.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.css']
})
export class ShowCourseComponent implements OnInit {

  course: CourseModel = null;

  loading: boolean;

  error: string;

  id: string;

  batches: BatchModel[] = [];

  constructor(private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.loading = true;
    this.route.params
    .subscribe(
      (params: Params) => {
        // tslint:disable-next-line: no-string-literal
        this.id = params['id'];
        this.courseService.getCourse(this.id)
        .subscribe(
          resData => {
            this.error = null;
            this.course = resData;
            this.batches = this.course.batch;
            this.loading = false;
            if (!this.course) {
              this.router.navigate(['/page_not_found'], {relativeTo: this.route});
              return;
            }
          },
          errorMessage => {
            this.loading = false;
            this.error = errorMessage;
            this.router.navigate(['/page_not_found'], {relativeTo: this.route});
          }
        );
      }
    );
  }

  editcourse() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  cancel() {
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }

}
