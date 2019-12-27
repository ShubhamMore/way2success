import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { AttendanceService } from '../../services/attendance.service';
import { HistoryService } from '../../services/history.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-show-student-attendance',
  templateUrl: './show-student-attendance.component.html',
  styleUrls: ['./show-student-attendance.component.css']
})
export class ShowStudentAttendanceComponent implements OnInit {
  id: string;

  loading: boolean;
  error: string = null;

  attendance: any[];

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
    private attendanceService: AttendanceService,
    private historyService: HistoryService,
    private studentService: StudentService,
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
    this.years = [];
    this.allCourses = [];
    this.courseType = [];
    this.month = '';
    this.year = '';
    this.course = '';
    this.batch = '';
    this.subject = '';
    this.curDate();
    const n: number = +this.date.split('-')[0];
    for (let i = 2015; i <= n; i++) {
      this.years.push(i.toString());
    }

    this.month = this.date.split('-')[1];
    this.year = this.date.split('-')[0];

    this.attendance = [];
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];
      this.historyService.getStudentHistory(this.id).subscribe(
        (resData: any) => {
          this.error = null;
          this.allCourses = resData.history;
          this.courseType = resData.courseType;
          this.branch = resData.branch;
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

  attendancePercentage() {
    let percentage = 0;
    const total = this.attendance.length;
    const present = this.present();
    if (present !== 0 && total !== 0) {
      percentage = (present / total) * 100;
    }
    if (percentage.toString().split('0')[1] !== '') {
      percentage = parseFloat(percentage.toFixed(2));
    }
    return percentage;
  }

  present() {
    let present = 0;
    this.attendance.forEach(atten => {
      if (atten.attendanceStatus === '1') {
        present++;
      }
    });
    return present;
  }

  absent() {
    let absent = 0;
    this.attendance.forEach(atten => {
      if (atten.attendanceStatus === '0') {
        absent++;
      }
    });
    return absent;
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
    this.searchAttendance(this.month, this.year, this.course, this.batch, this.subject);
  }

  onSelectCourse(course: string) {
    if (course !== '') {
      this.batches = [];
      this.batches = this.courses.find(curCourse => curCourse._id === course).batches;
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
      this.searchAttendance(this.month, this.year, this.course, this.batch, this.subject);
    }
  }

  onSelectMonth(month: string) {
    this.month = month;
    this.searchAttendance(this.month, this.year, this.course, this.batch, this.subject);
  }

  onSelectYear(year: string) {
    this.year = year;
    this.searchAttendance(this.month, this.year, this.course, this.batch, this.subject);
  }

  searchAttendance(month: string, year: string, course: string, batch: string, subject: string) {
    this.attendanceService
      .getAttendance(month, year, this.branch.branch, course, batch, subject, this.id)
      .subscribe(
        resData => {
          this.error = null;
          this.attendance = resData;
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

  onErrorClose() {
    this.error = null;
  }
}
