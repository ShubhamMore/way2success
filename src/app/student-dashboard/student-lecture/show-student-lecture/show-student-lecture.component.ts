import { Component, OnInit } from '@angular/core';
import { LectureService } from '../../../services/lecture.service';
import { LectureModel } from '../../../models/lecture.model';
import { LectureContentModel } from '../../../models/lecture-content.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-student-lecture',
  templateUrl: './show-student-lecture.component.html',
  styleUrls: ['./show-student-lecture.component.css']
})
export class ShowStudentLectureComponent implements OnInit {
  loading: boolean;
  error: string;

  lecture: LectureModel;
  lectureContents: LectureContentModel[];

  waitingToStart: string;
  lectureContentPrepared: boolean;

  constructor(
    private lectureService: LectureService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.lectureContents = [];
    this.lectureContentPrepared = false;
    this.route.params.subscribe((param: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = param['lectureid'];
      this.lectureService.getLectureContents(id).subscribe(
        (resData: any) => {
          this.lecture = resData.lecture;
          this.lectureContents = resData.lectureContents;
          this.loading = false;

          // Set Count Down Date
          const countDownDate = new Date(this.lecture.startTime).getTime();

          // Set Int  erval
          const x = setInterval(() => {
            // Get today's date and time
            const now = new Date().getTime();

            // Find the distance time between current date and the count down date
            const distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an 'waitingToStart' object variable
            this.waitingToStart =
              'Lecture Contents will Available In \n' +
              days +
              'd ' +
              hours +
              'h ' +
              minutes +
              'm ' +
              seconds +
              's ';

            // If the count down is over
            if (distance < 0) {
              // Clear Interval
              clearInterval(x);

              // Set Message while preparing video
              this.waitingToStart = 'Contents are Loading..';

              // Buffer time is 10 seconds (For calulating Video Data)
              const bufferTime = 10;

              // Calculate current Time
              let currentTime: number = Math.floor((new Date().getTime() - countDownDate) / 1000);

              // If current time is greater than duration plus buffer time, then video is expired
              if (currentTime > parseFloat(this.lecture.duration) * 60 + bufferTime) {
                this.waitingToStart = 'Lecture Contents Expired';
                return;
              }
              // If current time is greater than video duration without buffer time
              if (currentTime > parseFloat(this.lecture.duration)) {
                currentTime = parseFloat(this.lecture.duration);
              }

              // Calculate media timeout
              const mediaTimeOut: number =
                (Math.ceil(parseFloat(this.lecture.duration) * 60) - currentTime + bufferTime) *
                1000;

              // set 'waitingToStart' Variable to null
              this.waitingToStart = null;
              this.lectureContentPrepared = true;

              // Set timeout to media timeout
              setTimeout(() => {
                // Time is over then video is expire
                this.waitingToStart = 'Lecture Contents are Expired';
                this.lectureContentPrepared = false;
              }, mediaTimeOut);
            }
          }, 1000);
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
