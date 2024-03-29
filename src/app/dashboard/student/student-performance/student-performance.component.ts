import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { ExamService } from '../../../services/exam.service';
import { HistoryService } from '../../../services/history.service';
@Component({
  selector: 'app-student-performance',
  templateUrl: './student-performance.component.html',
  styleUrls: ['./student-performance.component.css']
})
export class StudentPerformanceComponent implements OnInit {
  id: string;

  loading: boolean;
  error: string;

  exams: any[];

  months: string[];
  month: string;

  years: string[];
  year: string;

  branch: any;

  allCourses: any[];
  courses: any[];
  course: string;

  courseType: string[];

  batches: any[];
  batch: string;

  subjects: any[];
  subject: string;

  date: string;

  constructor(
    private examService: ExamService,
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.loading = true;
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
    this.exams = [];
    this.years = [];
    this.allCourses = [];
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.curDate();
    const n: number = +this.date.split('-')[0];
    for (let i = 2015; i <= n; i++) {
      this.years.push(i.toString());
    }

    this.month = this.date.split('-')[1];
    this.year = this.date.split('-')[0];

    this.exams = [];
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];
      this.historyService.getStudentHistory(this.id).subscribe(
        (resData: any) => {
          this.error = null;
          this.allCourses = resData.history;
          this.courseType = resData.courseType;
          this.branch = resData.branch.branch;
          this.onSelectCourseType(this.courseType[0]);
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    });
  }

  curDate() {
    const date = new Date();
    this.date =
      date.getFullYear() +
      '-' +
      this.zeroAppend(date.getMonth() + 1) +
      '-' +
      this.zeroAppend(date.getDate());
  }

  zeroAppend(n: number): string {
    if (n < 10) {
      return ('0' + n).toString();
    }
    return n.toString();
  }

  onSelectCourseType(courseType: string) {
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.allCourses.forEach(curCourse => {
      if (curCourse.courseType === courseType) {
        this.courses.push(curCourse);
      }
    });
    this.course = this.courses[0]._id;
    this.batches = this.courses.find(course => course._id === this.course).batches;
    this.batch = this.batches[0]._id;
    this.subjects = this.batches.find(batch => batch._id === this.batch).subjects;
    this.subject = this.subjects[0]._id;
    this.searchExams(this.month, this.year, this.course, this.batch, this.subject);
  }

  onSelectcourse(course: string) {
    this.course = course;
    if (course !== '') {
      this.batches = [];
      this.batches = this.courses.find(curcourse => curcourse._id === course).batches;
      this.batch = '';
      this.subjects = [];
      this.subject = '';
    }
  }

  onSelectBatch(batch: string) {
    this.batch = batch;
    if (batch !== '') {
      this.subjects = [];
      this.subjects = this.batches.find(curBatch => curBatch._id === batch).subjects;
      this.subject = '';
    }
  }

  onSelectSubject(subject: string) {
    this.subject = subject;
    if (subject !== '') {
      this.searchExams(this.month, this.year, this.course, this.batch, this.subject);
    }
  }

  onSelectMonth(month: string) {
    this.month = month;
    this.searchExams(this.month, this.year, this.course, this.batch, this.subject);
  }

  onSelectYear(year: string) {
    this.year = year;
    this.searchExams(this.month, this.year, this.course, this.batch, this.subject);
  }

  searchExams(month: string, year: string, course: string, batch: string, subject: string) {
    this.examService
      .getExamsPerformance(month, year, this.branch.branch, course, batch, subject, this.id)
      .subscribe(
        resData => {
          this.error = null;
          this.exams = resData;
          this.loading = false;
        },
        errorMessage => {
          this.error = errorMessage;
          this.loading = false;
        }
      );
  }

  makeDate(date: string) {
    return date.split('-')[2] + '-' + date.split('-')[1] + '-' + date.split('-')[0];
  }

  cancel() {
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }
}
