import { Component, OnInit } from '@angular/core';
import { LectureService } from '../../services/lecture.service';
import { LectureModel } from '../../models/lecture.model';
import { LectureContentModel } from '../../models/lecture-content.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lecture-content',
  templateUrl: './lecture-content.component.html',
  styleUrls: ['./lecture-content.component.css']
})
export class LectureContentComponent implements OnInit {
  loading: boolean;
  error: string;

  lecture: LectureModel;
  lectureContents: LectureContentModel[];

  constructor(
    private lectureService: LectureService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.lectureContents = [];
    this.route.params.subscribe((param: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = param['id'];
      this.lectureService.getLectureContents(id).subscribe(
        (resData: any) => {
          this.lecture = resData.lecture;
          this.lectureContents = resData.lectureContents;
          this.loading = false;
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    });
  }

  deleteContent(id: string) {
    const confirm = window.confirm('Do You Really want to delete this Content??');
    if (confirm) {
      this.loading = true;
      this.lectureService.deleteLectureContent(id).subscribe(
        (resData: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }

  cancel() {
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }
}
