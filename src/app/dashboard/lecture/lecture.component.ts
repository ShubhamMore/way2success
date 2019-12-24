import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseModel, BatchModel, SubjectModel } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { LectureService } from 'src/app/services/lecture.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LectureModel } from 'src/app/models/lecture.model';
import { BranchModel } from 'src/app/models/branch.model';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.css']
})
export class LectureComponent implements OnInit {
  loading: boolean;

  error: boolean;

  form: FormGroup;

  lectures: LectureModel[];

  branches: BranchModel[];
  branch: string;

  allCourses: CourseModel[];
  courses: CourseModel[];
  course: string;

  batches: BatchModel[];
  batch: string;

  subjects: SubjectModel[];
  subject: string;

  noLecture: string;

  constructor(
    private courseService: CourseService,
    private lectureService: LectureService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.noLecture = 'Please Select Branch';
    this.lectures = [];
    this.branches = [];
    this.allCourses = [];
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.branch = this.lectureService.lectureSearchData.branch;
    this.course = this.lectureService.lectureSearchData.course;
    this.batch = this.lectureService.lectureSearchData.batch;
    this.subject = this.lectureService.lectureSearchData.subject;
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
            this.courseChanged();
            this.form.patchValue({ batch: this.batch });
            this.batchChanged();
            this.form.patchValue({ subject: this.subject });
            this.subjectChanged();
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

  onSelectBranch(branch: string) {
    if (branch !== '') {
      this.lectures = [];
      this.courses = [];
      this.batches = [];
      this.subjects = [];
      this.branch = branch;
      this.lectureService.lectureSearchData.branch = this.branch;
      this.lectureService.lectureSearchData.course = '';
      this.lectureService.lectureSearchData.batch = '';
      this.lectureService.lectureSearchData.subject = '';
      this.allCourses.forEach(curCourse => {
        if (curCourse.branch === branch) {
          this.courses.push(curCourse);
        }
      });
      this.form.reset({
        course: '',
        batch: '',
        subject: ''
      });
      this.noLecture = 'Please Select Course';
    }
  }

  courseChanged() {
    const id = this.form.value.course;
    if (id !== '') {
      this.batches = [];
      this.subjects = [];
      this.course = this.lectureService.lectureSearchData.course = id;
      const course = this.courses.find(curcourse => curcourse._id === id);
      this.batches = course.batch;
      this.form.patchValue({ batch: '', subject: '' });
      this.noLecture = 'Please Select Batch';
    }
  }

  batchChanged() {
    const id = this.form.value.batch;
    if (id !== '') {
      this.subjects = [];
      this.batch = this.lectureService.lectureSearchData.batch = id;
      const batch = this.batches.find(curBatch => curBatch._id === id);
      this.subjects = batch.subjects;
      this.form.patchValue({ subject: '' });
      this.noLecture = 'Please Select Subject';
    }
  }

  subjectChanged() {
    const id = this.form.value.subject;
    if (id !== '') {
      this.subject = this.lectureService.lectureSearchData.subject = id;
      const lecture = this.form.value;
      lecture.branch = this.branch;
      this.searchLecture(lecture);
    }
  }

  searchLecture(lecture: any) {
    this.loading = true;
    this.lectureService.getLectures(lecture).subscribe(
      (resData: any) => {
        this.error = null;
        this.lectures = resData;
        if (this.lectures.length < 1) {
          this.noLecture = 'No Lecture Available';
        }
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  editLecture(id: string) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  deleteLecture(id: string) {
    const confirm = window.confirm(
      // tslint:disable-next-line: max-line-length
      'Do you really want to Delete this lecture?\n If you Delete this Lecture all the lecture related data will be permanantly deleted from Database.., and lecture file will be disappere from server..\nIf you wish to delete this Click Ok'
    );
    if (confirm) {
      this.loading = true;
      this.lectureService.deleteLecture(id).subscribe(
        (resData: any) => {
          this.error = null;
          const i = this.lectures.findIndex(curlecture => curlecture._id === id);
          this.lectures.splice(i, 1);
          if (this.lectures.length < 1) {
            this.noLecture = 'No lecture Available';
          }
          this.loading = false;
        },
        (errorMessage: any) => {
          this.error = errorMessage;
          this.loading = false;
        }
      );
    }
  }

  onErrorClose() {
    this.error = null;
  }
}
