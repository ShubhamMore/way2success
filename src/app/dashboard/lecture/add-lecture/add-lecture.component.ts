import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseModel, BatchModel, SubjectModel } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BranchModel } from 'src/app/models/branch.model';
import { LectureService } from 'src/app/services/lecture.service';

@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.css']
})
export class AddLectureComponent implements OnInit {
  loading: boolean;
  error: boolean;

  form: FormGroup;
  branches: BranchModel[];
  allCourses: CourseModel[];
  courses: CourseModel[];
  batches: BatchModel[];

  subjects: SubjectModel[];

  date: string;

  constructor(
    private courseService: CourseService,
    private lectureService: LectureService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.curDate();
    this.branches = [];
    this.allCourses = [];
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.courseService.getBranchesAndCourses().subscribe(
      (resData: any) => {
        this.error = null;
        this.allCourses = resData.courses;
        this.branches = resData.branches;
        if (this.courses.length < 1) {
        }
        this.form = new FormGroup({
          title: new FormControl(null, {
            validators: [Validators.required]
          }),
          branch: new FormControl(this.branches[0]._id, {
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
          date: new FormControl(this.date, {
            validators: [Validators.required]
          })
        });
        this.branchChanged();
        this.loading = false;
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
  }

  zeroAppend(n: number): string {
    if (n < 10) {
      return ('0' + n).toString();
    }
    return n.toString();
  }

  branchChanged() {
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.allCourses.forEach(curCourse => {
      if (curCourse.branch === this.form.value.branch) {
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

  addLecture() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const lecture = {
      title: this.form.value.title,
      date: this.date,
      branch: this.form.value.branch,
      course: this.form.value.course,
      batch: this.form.value.batch,
      subject: this.form.value.subject
    };

    this.lectureService.addLecture(lecture).subscribe(
      (resData: any) => {
        this.error = null;
        this.form.reset({ date: this.date });
        this.loading = false;
        this.router.navigate(['/admin', 'lecture', resData.lecture, 'content', 'add'], {
          relativeTo: this.route
        });
      },
      errorMessage => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }

  cancel() {
    this.loading = true;
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }
}
