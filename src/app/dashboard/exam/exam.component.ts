import { Component, OnInit } from '@angular/core';
import { CourseModel, BatchModel, SubjectModel } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExamService } from '../../services/exam.service';
import { ExamModel } from 'src/app/models/exam.model';
import { BranchModel } from 'src/app/models/branch.model';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  loading: boolean;

  form: FormGroup;

  exams: ExamModel[];

  noExam = 'Please Select course';

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

  years: string[] = [];
  year: string;

  constructor(private courseService: CourseService,
              private examService: ExamService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.loading = true;
    this.year = new Date().getFullYear().toString();
    this.exams = [];
    this.branches = [];
    this.allCourses = [];
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.branch = this.examService.examSearchData.branch;
    this.course = this.examService.examSearchData.course;
    this.batch = this.examService.examSearchData.batch;
    this.subject = this.examService.examSearchData.subject;
    if (this.examService.examSearchData.year !== null) {
      this.year = this.examService.examSearchData.year;
    }
    const n: number = new Date().getFullYear();
    for (let i = 2015; i <= n; i++) {
      this.years.push(i.toString());
    }

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
          year : new FormControl(this.year, {
            validators: [Validators.required]
          })
        });

        if (this.branch !== '') {
          this.onSelectBranch(this.branch);
          if (this.course !== '') {
            this.form.patchValue({course: this.course});
            this.onSelectCourse();
            this.form.patchValue({batch: this.batch});
            this.onSelectBatch();
            this.form.patchValue({subject: this.subject});
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

  onSelectBranch(branch: string) {
    if (branch !== '') {
      this.exams = [];
      this.courses = [];
      this.batches = [];
      this.subjects = [];
      this.branch = branch;
      this.examService.examSearchData.branch = this.branch;
      this.examService.examSearchData.course = '';
      this.examService.examSearchData.batch = '';
      this.examService.examSearchData.subject = '';
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
      this.noExam = 'Please Select Course';
    }
  }

  onSelectCourse() {
    const id = this.form.value.course;
    if (id !== '') {
      this.course = id;
      this.examService.examSearchData.course = this.course;
      this.batches = this.courses.find((course) => (course._id === id)).batch;
      this.subjects = [];
      this.form.patchValue({ batch : '', subject: '' });
      this.noExam = 'Please Select Batch';
    }
  }

  onSelectBatch() {
    const id = this.form.value.batch;
    if (id !== '') {
      this.batch = id;
      this.examService.examSearchData.batch = this.batch;
      this.subjects = this.batches.find((batch) => (batch._id === id)).subjects;
      this.form.patchValue({ subject : '' });
      this.noExam = 'Please Select Subject';
    }
  }

  onSelectSubject() {
    const subject = this.form.value.subject;
    if (subject !== '') {
      this.subject = subject;
      this.examService.examSearchData.subject = this.subject;
      this.searchExans(this.course, this.batch, subject, this.year);
    }
  }

  onSelectYear() {
    this.year = this.form.value.year;
    this.examService.examSearchData.year = this.year;
    if (this.course === '') {
      this.noExam = 'Please Select Course';
      return;
    } else if (this.batch === '') {
      this.noExam = 'Please Select Batch';
      return;
    } else if (this.subject === '') {
      this.noExam = 'Please Select Subject';
      return;
    }
    this.searchExans(this.course, this.batch, this.subject, this.year);
  }

  searchExans(course: string, batch: string, subject: string, year: string) {
    this.loading = true;
    this.examService.getExams(course, batch, subject, year)
    .subscribe(
      (resData: any) => {
        this.error = null;
        this.exams = resData;

        if (this.exams.length < 1) {
          this.noExam = 'No Exams Found';
        }

        this.loading = false;
      },
      (errorMessage: any) => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }

  editExam(id: string) {
    this.router.navigate([id, 'edit'], {relativeTo: this.route});
  }

  deleteExam(id: string) {
    // tslint:disable-next-line: max-line-length
    const confirm = window.confirm('Do you really want to Delete this Exam?\n If you Delete this Exam all the exam related data will be permanantly deleted from Database..\nIf you wish to delete this Click Ok');
    if (confirm) {
      this.loading = true;
      this.examService.deleteExam(id)
      .subscribe(
        (resData: any) => {
          this.error = null;
          this.ngOnInit();
        },
        (errorMessage: any) => {
          this.error = errorMessage;
          this.loading = false;
        }
      );
    }
  }

}
