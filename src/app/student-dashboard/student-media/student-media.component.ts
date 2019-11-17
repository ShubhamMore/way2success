import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { ExamService } from '../../services/exam.service';
import { StudentService } from '../../services/student.service';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-student-media',
  templateUrl: './student-media.component.html',
  styleUrls: ['./student-media.component.css']
})
export class StudentMediaComponent implements OnInit {

  id: string;

  loading: boolean;
  error: string;

  medias: any[];

  months: string[];

  studentData: any;

  subject: string;

  date: string;

  constructor(private studentService: StudentService,
              private mediaService: MediaService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {

    this.loading = true;
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.studentData = null;
    this.medias = [];
    this.subject = '';

    this.curDate();

    this.route.params
    .subscribe(
      (params: Params) => {
        // tslint:disable-next-line: no-string-literal
        this.id = params['id'];
        this.studentService.getStudentDataForMedia(this.id)
        .subscribe(
          resData => {
            this.error = null;
            this.studentData = resData;
            this.subject = this.studentData.subjects[0]._id;
            this.searchMedia(this.date, this.studentData.course, this.studentData.batch, this.subject);
            this.loading = false;
          },
          errorMessage => {
            this.error = errorMessage;
            this.loading = false;
          }
        );
      }
    );
  }

  curDate() {
    const date = new Date();
    this.date = this.months[date.getMonth()] + ' ' + this.zeroAppend(date.getDate()) + ', ' + date.getFullYear();
    console.log(this.date);
  }

  zeroAppend(n: number): string {
    if (n < 10) {
      return ('0' + n).toString();
    }
    return n.toString();
  }

  onSelectSubject(subject: string) {
    this.subject = subject;
    if (subject !== '') {
      this.searchMedia(this.date, this.studentData.course, this.studentData.batch, this.subject);
    }
  }

  searchMedia(date: string, course: string, batch: string, subject: string) {

    this.mediaService.getMediaForStudent(date, course, batch, subject)
    .subscribe(
      resData => {
        this.error = null;
        this.medias = resData;
        this.loading = false;
      },
      errorMessage => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }
}
