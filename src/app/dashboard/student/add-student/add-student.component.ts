import { Component, OnInit } from '@angular/core';
import { CourseModel, BatchModel, SubjectModel } from '../../../models/course.model';
import { StudentService } from '../../../services/student.service';
import { CourseService } from '../../../services/course.service';
import { EncryptService } from '../../../encrypt.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { BranchModel } from '../../../models/branch.model';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  loading: boolean;

  error: boolean;

  form: FormGroup;

  userExist: boolean;

  branches: BranchModel[];

  allCourses: CourseModel[];
  courses: CourseModel[];

  batches: BatchModel[];

  subjects: SubjectModel[];

  subjectsToAdd: string[];

  constructor(private courseService: CourseService,
              private encryptService: EncryptService,
              private studentService: StudentService,
              private userService: UserService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    this.userExist = false;
    this.branches = [];
    this.allCourses = [];
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.subjectsToAdd = [];
    this.courseService.getBranchesAndCourses()
    .subscribe(
      resData => {
        this.error = null;
        this.allCourses = resData.courses;
        this.branches = resData.branches;
        if (this.courses.length < 1) {

        }
        this.form = new FormGroup({
          name: new FormControl(null, {
            validators: [Validators.required]
          }),
          birthDate: new FormControl(null, {
            validators: [Validators.required]
          }),
          email: new FormControl(null, {
            validators: [Validators.required, Validators.email]
          }),
          phone: new FormControl(null, {
            validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
          }),
          address: new FormControl(null, {
            validators: [Validators.required]
          }),
          branch: new FormControl('', {
            validators: [Validators.required]
          }),
          course: new FormControl('', {
            validators: [Validators.required]
          }),
          batch: new FormControl('', {
            validators: [Validators.required]
          }),
          status: new FormControl('0', {
            validators: [Validators.required]
          })
        });
        this.loading = false;
      },
      errorMessage => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }

  branchChanged() {
    const id = this.form.value.branch;
    if (id !== '') {
      this.courses = [];
      this.batches = [];
      this.subjects = [];
      this.subjectsToAdd = [];
      this.form.patchValue({
        course: '',
        batch: ''
      });
      this.allCourses.forEach(curCourse => {
        if (curCourse.branch === id) {
          this.courses.push(curCourse);
        }
      });
    }
  }

  courseChanged() {
    const id = this.form.value.course;
    if (id !== '') {
      this.batches = [];
      this.subjects = [];
      this.subjectsToAdd = [];
      this.form.patchValue({
        batch: ''
      });
      const course = this.courses.find((curCourse) => curCourse._id === id);
      this.batches = course.batch;
      this.form.patchValue({
        batch: ''
      });
    }
  }

  batchChanged() {
    const id = this.form.value.batch;
    if (id !== '') {
      this.subjects = [];
      this.subjectsToAdd = [];
      const batch = this.batches.find((curBatch) => curBatch._id === id);
      this.subjects = batch.subjects;
    }
  }

  checkUser() {
    if (this.form.controls.email.status === 'VALID') {
      this.userService.checkUser(this.form.value.email)
      .subscribe(
        (resData: any) => {
          this.userExist = resData.exist;
        },
        errorMessage => {
          this.error = errorMessage;
        }
      );
    }
  }

  addStudent() {
    if (this.form.invalid) {
      return;
    }

    if (this.subjectsToAdd.length < 1) {
      return;
    }

    if (this.userExist) {
      return;
    }

    this.loading = true;

    const student = {
      name: this.form.value.name,
      birthDate: this.form.value.birthDate,
      phone: this.form.value.phone,
      email: this.form.value.email,
      password: this.encryptService.encrypt(this.form.value.phone, environment.encKey),
      address: this.form.value.address,
      branch: this.form.value.branch,
      course: this.form.value.course,
      batch: this.form.value.batch,
      subjects: this.subjectsToAdd,
      status: this.form.value.status
    };

    this.studentService.addStudent(student)
    .subscribe(
      resData => {
        this.error = null;
        this.loading = false;
        this.location.back();
      },
      errorMessage => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }

  subjectsChanged(event: any, subject: string) {
    if (event.target.checked) {
      this.subjectsToAdd.push(subject);
      return;
    }
    const i = this.subjectsToAdd.indexOf(subject);
    this.subjectsToAdd.splice(i, 1);
  }

  cancel() {
    this.loading = true;
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }

}
