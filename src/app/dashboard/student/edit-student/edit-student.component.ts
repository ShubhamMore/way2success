import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseModel, BatchModel, SubjectModel } from '../../../models/course.model';
import { StudentService } from '../../../services/student.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { StudentModel } from '../../../models/student.model';
import { BranchModel } from '../../../models/branch.model';
import { UserService } from '../../../services/user.service';
import { environment } from '../../../../environments/environment';
import { EncryptService } from '../../../encrypt.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  loading: boolean;
  error: boolean;

  form: FormGroup;

  branches: BranchModel[];

  allCourses: CourseModel[];
  courses: CourseModel[];
  course: CourseModel;

  userExist: boolean;

  batches: BatchModel[];
  batch: BatchModel;

  subjects: SubjectModel[];
  subjectsToAdd: string[];

  student: StudentModel;

  constructor(private userService: UserService,
              private encryptService: EncryptService,
              private studentService: StudentService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    this.userExist = false;
    this.courses = this.batches = this.subjects = this.subjectsToAdd = [];
    this.route.params
    .subscribe(
      (params: Params) => {
        // tslint:disable-next-line: no-string-literal
        const id = params['id'];
        this.student = this.studentService.getStudentForEditing(id)
        .subscribe(
          resData => {
            this.error = null;
            this.student = resData.student;
            if (!this.student) {
              this.router.navigate(['/page_not_found'], {relativeTo: this.route});
              return;
            }
            this.allCourses = resData.courses;
            this.branches = resData.branches;

            this.form = new FormGroup({
              name: new FormControl(this.student.name, {
                validators: [Validators.required]
              }),
              birthDate: new FormControl(this.student.birthDate, {
                validators: [Validators.required]
              }),
              email: new FormControl(this.student.email, {
                validators: [Validators.required, Validators.email]
              }),
              phone: new FormControl(this.student.phone, {
                validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
              }),
              address: new FormControl(this.student.address, {
                validators: [Validators.required]
              }),
              branch: new FormControl(this.student.branch, {
                validators: [Validators.required]
              }),
              course: new FormControl('', {
                validators: [Validators.required]
              }),
              batch: new FormControl('', {
                validators: [Validators.required]
              }),
              status: new FormControl(this.student.status, {
                validators: [Validators.required]
              })
            });

            this.branchChanged();
            this.form.patchValue({course: this.student.course});
            this.course = this.courses.find((course) => course._id === this.student.course);
            this.batch = this.course.batch.find((batch) => batch._id === this.student.batch);
            this.subjects = this.batch.subjects;
            this.courseChanged();
            this.form.patchValue({batch: this.student.batch});
            this.batchChanged();
            this.subjectsToAdd = this.student.subjects;

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
    if (this.form.value.email === this.student.email) {
      this.userExist = false;
      return;
    } else if (this.form.controls.email.status === 'VALID') {
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

    const student: any = {
      _id: this.student._id,
      name: this.form.value.name.toLowerCase(),
      birthDate: this.form.value.birthDate,
      phone: this.form.value.phone,
      email: this.form.value.email,
      password: this.encryptService.encrypt(this.form.value.phone, environment.encKey),
      address: this.form.value.address,
      course: this.form.value.course,
      batch: this.form.value.batch,
      subjects: this.subjectsToAdd,
      branch: this.form.value.branch,
      status: this.form.value.status
    };

    this.studentService.editStudent(student)
    .subscribe(
      resData => {
        this.error = null;
        this.cancel();
        this.loading = false;
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

  subChecked(subject: string): boolean {
    const s = this.subjectsToAdd.find((sub => sub === subject));
    if (!!s) {
      return true;
    }
    return false;
  }

  cancel() {
    this.loading = true;
    this.location.back();
  }
}
