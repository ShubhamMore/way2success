import { Component, OnInit } from '@angular/core';
import { CourseModel, BatchModel, SubjectModel } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AttendanceService } from '../../services/attendance.service';
import { BranchModel } from 'src/app/models/branch.model';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  loading: boolean;

  form: FormGroup;

  students: any[];

  attendance: any[];
  attenTaken: boolean;

  noStudent: string;

  branches: BranchModel[];
  branch: string;

  allCourses: CourseModel[];
  courses: CourseModel[];
  course: string;

  courseType: string;

  batches: BatchModel[];
  batch: string;

  subjects: SubjectModel[];
  subject: string;

  error: string;

  date: string;

  constructor(
    private courseService: CourseService,
    private attendaceService: AttendanceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;

    this.curDate();
    this.students = [];
    this.attendance = [];
    this.branches = [];
    this.allCourses = [];
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.noStudent = 'Please Select Branch';

    this.attenTaken = false;
    if (this.attendaceService.attendanceSearchData.date !== null) {
      this.date = this.attendaceService.attendanceSearchData.date;
    }
    this.branch = this.attendaceService.attendanceSearchData.branch;
    this.courseType = this.attendaceService.attendanceSearchData.courseType;
    this.course = this.attendaceService.attendanceSearchData.course;
    this.batch = this.attendaceService.attendanceSearchData.batch;
    this.subject = this.attendaceService.attendanceSearchData.subject;

    this.courseService.getBranchesAndCourses().subscribe(
      (resData: any) => {
        this.error = null;
        this.allCourses = resData.courses;
        this.branches = resData.branches;
        this.form = new FormGroup({
          course: new FormControl('', {
            validators: [Validators.required]
          }),
          batch: new FormControl('', {
            validators: [Validators.required]
          }),
          subject: new FormControl('', {
            validators: [Validators.required]
          })
        });

        if (this.branch !== '') {
          this.onSelectBranch(this.branch);
          if (this.course !== '') {
            this.form.patchValue({ course: this.course });
            this.onSelectCourse();
            this.form.patchValue({ batch: this.batch });
            this.onSelectBatch();
            this.form.patchValue({ subject: this.subject });
            this.onSelectSubject();
          } else {
            this.loading = false;
          }
        } else {
          this.onSelectBranch(this.branches[0]._id);
          this.loading = false;
        }
      },
      (errorMessage: any) => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }

  curDate() {
    const date = new Date();
    this.date =
      date.getFullYear() +
      '-' +
      this.zeroAppend(date.getMonth() + 1) +
      '-' +
      this.zeroAppend(date.getDate());
    if (this.attendaceService.attendanceSearchData.date === null) {
      this.attendaceService.attendanceSearchData.date = this.date;
    }
  }

  zeroAppend(n: number): string {
    if (n < 10) {
      return ('0' + n).toString();
    }
    return n.toString();
  }

  onSelectBranch(branch: string) {
    if (branch !== '') {
      this.students = [];
      this.courses = [];
      this.batches = [];
      this.subjects = [];
      this.branch = branch;
      this.attendaceService.attendanceSearchData.branch = this.branch;
      this.attendaceService.attendanceSearchData.course = '';
      this.attendaceService.attendanceSearchData.batch = '';
      this.attendaceService.attendanceSearchData.subject = '';
      this.allCourses.forEach(curCourse => {
        if (curCourse.branch === branch && curCourse.courseType === this.courseType) {
          this.courses.push(curCourse);
        }
      });
      this.form.patchValue({
        course: '',
        batch: '',
        subject: ''
      });
      this.noStudent = 'Please Select Course';
    }
  }

  onSelectCourseType(courseType: string) {
    this.students = [];
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.courseType = courseType;
    this.attendaceService.attendanceSearchData.courseType = this.courseType;
    this.attendaceService.attendanceSearchData.course = '';
    this.attendaceService.attendanceSearchData.batch = '';
    this.attendaceService.attendanceSearchData.subject = '';
    this.allCourses.forEach(curCourse => {
      if (curCourse.branch === this.branch && curCourse.courseType === courseType) {
        this.courses.push(curCourse);
      }
    });
    this.form.patchValue({
      course: '',
      batch: '',
      subject: ''
    });
    this.noStudent = 'Please Select Course';
  }

  onDateChange(date: string) {
    this.date = date;
    this.attendaceService.attendanceSearchData.date = this.date;
    if (this.course !== '' && this.batch !== '' && this.subject !== '') {
      this.searchStudent(this.course, this.batch, this.subject);
    }
  }

  onSelectCourse() {
    const id = this.form.value.course;
    if (id !== '') {
      this.course = id;
      this.attendaceService.attendanceSearchData.course = this.course;
      this.batches = this.courses.find(course => course._id === id).batch;
      this.subjects = [];
      this.form.patchValue({ batch: '', subject: '' });
      this.noStudent = 'Please Select Batch';
    }
  }

  onSelectBatch() {
    const id = this.form.value.batch;
    if (id !== '') {
      this.batch = id;
      this.attendaceService.attendanceSearchData.batch = this.batch;
      this.subjects = this.batches.find(batch => batch._id === id).subjects;
      this.form.patchValue({ subject: '' });
      this.noStudent = 'Please Select Subject';
    }
  }

  onSelectSubject() {
    const subject = this.form.value.subject;
    if (subject !== '') {
      this.subject = subject;
      this.attendaceService.attendanceSearchData.subject = this.subject;
      this.searchStudent(this.course, this.batch, subject);
    }
  }

  searchStudent(course: string, batch: string, subject: string) {
    this.loading = true;
    this.attendaceService.getStudents(course, batch, subject, this.date).subscribe(
      (resData: any) => {
        this.error = null;
        if (resData.atten) {
          this.attenTaken = resData.atten;
          this.attendance = resData.attendance;
        } else {
          this.attenTaken = false;
          this.attendance = [];
          this.students = resData;
          if (this.students.length < 1) {
            this.noStudent = 'No Students Found';
          }

          this.students.forEach(student => {
            const attendance = {
              student: student._id,
              attendanceStatus: '0'
            };
            this.attendance.push(attendance);
          });
        }

        this.loading = false;
      },
      (errorMessage: any) => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }

  markAttendance(event: any, student: string, index: number) {
    if (event.target.checked) {
      this.attendance[index].attendanceStatus = '1';
    } else {
      this.attendance[index].attendanceStatus = '0';
    }
  }

  saveAttendance() {
    if (this.form.valid && this.students.length > 0) {
      this.loading = true;
      const attendance = {
        date: this.date,
        course: this.form.value.course,
        batch: this.form.value.batch,
        subject: this.form.value.subject,
        attendance: this.attendance
      };
      this.attendaceService.saveAttendance(attendance).subscribe(
        (responce: any) => {
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
