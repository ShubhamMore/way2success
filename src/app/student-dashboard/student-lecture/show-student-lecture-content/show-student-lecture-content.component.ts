import { Component, OnInit } from '@angular/core';
import { LectureModel } from '../../../models/lecture.model';
import { LectureContentModel } from '../../../models/lecture-content.model';
import { LectureService } from '../../../services/lecture.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-student-lecture-content',
  templateUrl: './show-student-lecture-content.component.html',
  styleUrls: ['./show-student-lecture-content.component.css']
})
export class ShowStudentLectureContentComponent implements OnInit {
  loading: boolean;
  error: string;

  lecture: LectureModel;
  lectureContent: LectureContentModel;
  constructor(
    private lectureService: LectureService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((param: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = param['contentid'];
      this.lectureService.getLectureContent(id).subscribe(
        (resData: any) => {
          this.lectureContent = resData;
          this.loading = false;
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    });
  }

  cancel() {
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }
}
