import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/models/student.model';
import { CourseModel, BatchModel, SubjectModel } from 'src/app/models/course.model';
import { StudentService } from 'src/app/services/student.service';
import { CourseService } from 'src/app/services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { BranchModel } from 'src/app/models/branch.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  loading: boolean;

  form: FormGroup;

  searchType: string;

  students: StudentModel[];
  student: string;

  noStudent: string;

  branches: BranchModel[];
  branch: string;

  allCourses: CourseModel[];
  courses: CourseModel[];
  course: string;

  batches: BatchModel[];
  batch: string;

  subjects: SubjectModel[];
  subject: string;

  error: string;

  constructor(private courseService: CourseService,
              private studentService: StudentService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.loading = true;
    this.students = [];
    this.branches = [];
    this.allCourses = [];
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.branch = this.studentService.studentSearchData.branch;
    this.searchType = this.studentService.studentSearchData.searchType;
    this.course = this.studentService.studentSearchData.course;
    this.batch = this.studentService.studentSearchData.batch;
    this.subject = this.studentService.studentSearchData.subject;
    this.student = this.studentService.studentSearchData.student;
    this.noStudent = 'Please Select Branch';
    this.courseService.getBranchesAndCourses()
    .subscribe(
      (resData: any) => {
        this.error = null;
        this.allCourses = resData.courses;
        this.branches = resData.branches;
        this.form = new FormGroup({
          course : new FormControl('', {
            validators: [Validators.required]
          }),
          batch : new FormControl('', {
            validators: [Validators.required]
          }),
          subject : new FormControl('', {
            validators: [Validators.required]
          }),
          student : new FormControl(this.student, {
            validators: [Validators.required]
          })
        });

        if (this.branch !== '') {
          this.onSelectBranch(this.branch);
          if (this.course !== '') {
            if (this.searchType === '0' || this.searchType === '1' || this.searchType === '2') {
              this.form.patchValue({course: this.course});
              this.onSelectCourse();
            }
            if (this.searchType === '0' || this.searchType === '1') {
              this.form.patchValue({batch: this.batch});
              this.onSelectBatch();
            }
            if (this.searchType === '0') {
              this.form.patchValue({subject: this.subject});
              this.onSelectSubject();
            }
          } else if (this.student !== null && this.searchType === '3') {
            this.searchByStudentName();
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
      this.courses = [];
      this.batches = [];
      this.subjects = [];
      this.branch = branch;
      this.studentService.studentSearchData.branch = this.branch;
      this.studentService.studentSearchData.course = '';
      this.studentService.studentSearchData.batch = '';
      this.studentService.studentSearchData.subject = '';
      this.allCourses.forEach(curCourse => {
        if (curCourse.branch === branch) {
          this.courses.push(curCourse);
        }
      });
      this.form.patchValue({
        course: '',
        batch: '',
        subject: ''
      });
      if (this.searchType === '3') {
        if (this.branch !== '') {
          this.noStudent = null;
        }
      } else {
        this.noStudent = 'Please Select Course';
      }
    }
  }

  onSelectSearchType(event: any) {
    this.searchType = event.target.value;
    this.studentService.studentSearchData.searchType = this.searchType;
    if (this.searchType === '3') {
      if (this.branch !== '') {
        this.noStudent = null;
      }
    } else {
      this.noStudent = 'Please select Course';
    }
  }

  onSelectCourse() {
    const id = this.form.value.course;
    if (id !== '') {
      this.course = id;
      this.studentService.studentSearchData.course = this.course;
      this.batches = this.courses.find((course) => (course._id === id)).batch;
      this.form.patchValue({ batch : '', subject : ''});
      this.students = [];
      if (this.searchType === '2') {
        this.searchStudent();
      } else {
        this.noStudent = 'Please Select Batch';
      }
    }
  }

  onSelectBatch() {
    const id = this.form.value.batch;
    if (id !== '') {
      this.batch = id;
      this.studentService.studentSearchData.batch = this.batch;
      this.subjects = this.batches.find((batch) => (batch._id === id)).subjects;
      this.form.patchValue({ subject : '' });
      if (this.searchType === '1') {
        this.searchStudent();
      } else {
        this.noStudent = 'Please Select Subject';
      }
    }
  }

  onSelectSubject() {
    const id = this.form.value.subject;
    if (id !== '') {
      this.subject = id;
      this.studentService.studentSearchData.subject = this.subject;
      this.searchStudent();
    }
  }

  searchByStudentName() {
    this.student = this.form.value.student;
    this.studentService.studentSearchData.student = this.student;
    this.searchStudent();
  }

  prepareSearchData() {
    if (this.searchType === '0') {
      return {branch: this.branch, course: this.course, batch: this.batch, subject: this.subject, searchType: this.searchType};
    } else if (this.searchType === '1') {
      return {branch: this.branch, course: this.course, batch: this.batch, searchType: this.searchType};
    } else if (this.searchType === '2') {
      return {branch: this.branch, course: this.course, searchType: this.searchType};
    } else if (this.searchType === '3') {
      return {branch: this.branch, student: this.student.toLowerCase(), searchType: this.searchType};
    }
  }

  clearSearchData() {
    this.student = this.course = this.batch = this.student = null;
    this.batches = this.subjects = [];
    this.form.setValue({
      course: '',
      batch: '',
      subject: '',
      student: null
    });
  }

  searchStudent() {
    if (this.branch !== '') {
      this.loading = true;
      const searchData: any = this.prepareSearchData();
      this.studentService.getStudents(searchData)
      .subscribe(
        resData => {
          this.error = null;
          this.students = resData;
          if (this.students.length < 1) {
            this.noStudent = 'No Students Found';
          }
          // this.clearSearchData();
          this.loading = false;
        },
        errorMessage => {
          this.error = errorMessage;
          this.loading = false;
        }
      );
    }
  }

  editStudent(id: string) {
    this.router.navigate([id, 'edit'], {relativeTo: this.route});
  }

  deleteStudent(id: string) {
    // this.studentService.delete(id);
    this.ngOnInit();
  }

  onPaymentClick(student: string) {
    this.router.navigate([student, 'payment'], {relativeTo: this.route});
  }

  cancel() {
    this.location.back();
  }

}
