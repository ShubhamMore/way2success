import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { LectureService } from '../../services/lecture.service';
import { StudentService } from '../../services/student.service';
import { LectureModel } from 'src/app/models/lecture.model';

@Component({
  selector: 'app-student-lecture',
  templateUrl: './student-lecture.component.html',
  styleUrls: ['./student-lecture.component.css']
})
export class StudentLectureComponent implements OnInit {
  id: string;

  loading: boolean;
  error: string;

  lectures: LectureModel[];

  studentData: any;

  batch: string;

  subjects: any[];
  subject: string;

  months: string[];

  date: string;

  constructor(
    private studentService: StudentService,
    private lectureService: LectureService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.loading = true;
    this.studentData = null;
    this.lectures = [];
    this.subjects = [];
    this.months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    this.subject = '';

    this.curDate();

    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];
      this.studentService.getStudentDataForLecture(this.id).subscribe(
        (resData: any) => {
          this.error = null;
          this.studentData = resData;
          this.batch = this.studentData.batches[0]._id;
          this.onSelectBatch(this.batch);
          this.subject = this.subjects[0]._id;
          this.searchLecture(
            this.studentData.course,
            this.studentData.batch,
            this.subject,
            this.date
          );
          this.loading = false;
        },
        (errorMessage: any) => {
          this.error = errorMessage;
          this.loading = false;
        }
      );
    });
  }

  curDate() {
    const date = new Date();
    this.date =
      this.months[date.getMonth()] +
      ' ' +
      this.zeroAppend(date.getDate()) +
      ', ' +
      date.getFullYear();
  }

  zeroAppend(n: number): string {
    if (n < 10) {
      return ('0' + n).toString();
    }
    return n.toString();
  }

  onSelectBatch(batch: string) {
    if (batch !== '') {
      this.batch = batch;
      this.studentData.batches.forEach(curBatch => {
        if (curBatch._id === batch) {
          this.subjects = curBatch.subjects;
        }
      });
    }
  }

  onSelectSubject(subject: string) {
    if (subject !== '') {
      this.subject = subject;
      this.searchLecture(this.studentData.course, this.batch, this.subject, this.date);
    }
  }

  searchLecture(course: string, batch: string, subject: string, date: string) {
    this.lectureService.getLecturesForStudent(course, batch, subject, date).subscribe(
      resData => {
        this.error = null;
        this.lectures = resData;
        this.loading = false;
      },
      errorMessage => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }

  onErrorClose() {
    this.error = null;
  }
}
