import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseModel, BatchModel, SubjectModel } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { BranchModel } from 'src/app/models/branch.model';
import { LectureService } from 'src/app/services/lecture.service';
import { LectureModel } from 'src/app/models/lecture.model';

@Component({
  selector: 'app-edit-lecture',
  templateUrl: './edit-lecture.component.html',
  styleUrls: ['./edit-lecture.component.css']
})
export class EditLectureComponent implements OnInit {
  loading: boolean;
  error: boolean;

  id: string;

  form: FormGroup;
  branches: BranchModel[];
  allCourses: CourseModel[];
  courses: CourseModel[];
  batches: BatchModel[];

  subjects: SubjectModel[];

  lecture: LectureModel;

  months: string[];

  constructor(
    private courseService: CourseService,
    private lectureService: LectureService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.branches = [];
    this.allCourses = [];
    this.courses = [];
    this.batches = [];
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
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];
      this.lectureService.getLectureForEditing(this.id).subscribe(
        (resData: any) => {
          this.error = null;
          this.lecture = resData.lecture;
          // If no lecture available
          if (!this.lecture) {
            this.router.navigate(['/page_not_found'], { relativeTo: this.route });
            return;
          }
          this.allCourses = resData.courses;
          this.branches = resData.branches;
          if (this.courses.length < 1) {
          }
          this.form = new FormGroup({
            title: new FormControl(this.lecture.title, {
              validators: [Validators.required]
            }),
            branch: new FormControl(this.lecture.branch, {
              validators: [Validators.required]
            }),
            courseType: new FormControl(this.lecture.courseType, {
              validators: [Validators.required]
            }),
            course: new FormControl('', {
              validators: [Validators.required]
            }),
            batch: new FormControl('', {
              validators: [Validators.required]
            }),
            subject: new FormControl('', {
              validators: [Validators.required]
            }),
            date: new FormControl(null, {
              validators: [Validators.required]
            }),
            time: new FormControl(null, {
              validators: [Validators.required]
            }),
            duration: new FormControl(this.lecture.duration, {
              validators: [Validators.required]
            })
          });
          this.branchChanged();
          this.form.patchValue({ course: this.lecture.course });
          this.courseChanged();
          this.form.patchValue({ batch: this.lecture.batch });
          this.batchChanged();
          this.form.patchValue({ subject: this.lecture.subject });

          const startDateTime = this.lecture.startTime.split(' ');
          const date =
            startDateTime[2] +
            '-' +
            this.month(startDateTime[0]) +
            '-' +
            startDateTime[1].replace(',', '');
          this.form.patchValue({ date });

          const startTime = startDateTime[3].split(':');
          const time = startTime[0] + ':' + startTime[1];
          this.form.patchValue({ time });

          this.loading = false;
        },
        (errorMessage: any) => {
          this.error = errorMessage;
          this.loading = false;
        }
      );
    });
  }

  month(month: string) {
    const m = this.months.indexOf(month) + 1;
    if (m < 10) {
      return '0' + m;
    }
    return m.toString();
  }

  branchChanged() {
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.allCourses.forEach(curCourse => {
      if (
        curCourse.branch === this.form.value.branch &&
        curCourse.courseType === this.form.value.courseType
      ) {
        this.courses.push(curCourse);
      }
    });
    this.form.patchValue({
      course: '',
      batch: '',
      subject: ''
    });
  }

  courseTypeChanged() {
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.allCourses.forEach(curCourse => {
      if (
        curCourse.branch === this.form.value.branch &&
        curCourse.courseType === this.form.value.courseType
      ) {
        this.courses.push(curCourse);
      }
    });
    this.form.patchValue({
      course: '',
      batch: '',
      subject: ''
    });
  }

  courseChanged() {
    this.batches = [];
    this.subjects = [];
    const course = this.courses.find(cueCourse => cueCourse._id === this.form.value.course);
    this.batches = course.batch;
    this.form.patchValue({
      batch: '',
      subject: ''
    });
  }

  batchChanged() {
    this.subjects = [];
    const batch = this.batches.find(curBatch => curBatch._id === this.form.value.batch);
    this.subjects = batch.subjects;
    this.form.patchValue({
      subject: ''
    });
  }

  editLecture() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const date = this.form.value.date.split('-');
    const time = this.form.value.time + ':00';
    const startTime = this.months[date[1] - 1] + ' ' + date[2] + ', ' + date[0] + ' ' + time;

    const lecture = {
      _id: this.lecture._id,
      title: this.form.value.title,
      startTime,
      duration: this.form.value.duration,
      branch: this.form.value.branch,
      courseType: this.form.value.courseType,
      course: this.form.value.course,
      batch: this.form.value.batch,
      subject: this.form.value.subject
    };

    this.lectureService.editLecture(lecture).subscribe(
      resData => {
        this.error = null;
        this.location.back();
        this.loading = false;
      },
      errorMessage => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }

  cancel() {
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }
}
