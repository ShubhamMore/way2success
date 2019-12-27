import { Component, OnInit } from '@angular/core';
import { StudentModel } from '../../../models/student.model';
import { CourseModel, BatchModel, SubjectModel } from '../../../models/course.model';
import { CourseService } from '../../../services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExamService } from 'src/app/services/exam.service';
import { BranchModel } from 'src/app/models/branch.model';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css']
})
export class AddExamComponent implements OnInit {
  loading: boolean;

  examForm: FormGroup;

  students: StudentModel[];

  marks: any[];

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
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.students = [];
    this.marks = [];
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.noStudent = 'Please Select Branch';
    this.curDate();

    this.courseService.getBranchesAndCourses().subscribe(
      resData => {
        this.error = null;
        this.allCourses = resData.courses;
        this.branches = resData.branches;
        this.examForm = new FormGroup({
          examTitle: new FormControl(null, {
            validators: [Validators.required]
          }),
          outOfMarks: new FormControl(null, {
            validators: [Validators.required, Validators.minLength(2), Validators.maxLength(3)]
          }),
          passingMarks: new FormControl(null, {
            validators: [Validators.required, Validators.minLength(2), Validators.maxLength(3)]
          }),
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
        this.branch = this.branches[0]._id;
        this.onSelectBranch(this.branch);
        this.loading = false;
      },
      errorMessage => {
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

  onSelectBranch(branch: string) {
    if (branch !== '') {
      this.students = [];
      this.courses = [];
      this.batches = [];
      this.subjects = [];
      this.branch = branch;
      this.course = '';
      this.courseType = '0';
      this.batch = '';
      this.subject = '';
      this.allCourses.forEach(curCourse => {
        if (curCourse.branch === branch && curCourse.courseType === this.courseType) {
          this.courses.push(curCourse);
        }
      });
      this.examForm.patchValue({
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
    this.course = '';
    this.batch = '';
    this.subject = '';
    this.allCourses.forEach(curCourse => {
      if (curCourse.branch === this.branch && curCourse.courseType === courseType) {
        this.courses.push(curCourse);
      }
    });
    this.examForm.patchValue({
      course: '',
      batch: '',
      subject: ''
    });
    this.noStudent = 'Please Select Course';
  }

  onSelectCourse() {
    const id = this.examForm.value.course;
    if (id !== '') {
      this.course = id;
      this.batches = this.courses.find(course => course._id === id).batch;
      this.examForm.patchValue({ batch: '', subject: '' });
      this.batch = '';
      this.subject = '';
      this.noStudent = 'Please Select Batch';
    }
  }

  onSelectBatch() {
    const id = this.examForm.value.batch;
    if (id !== '') {
      this.batch = id;
      this.subjects = this.batches.find(batch => batch._id === id).subjects;
      this.examForm.patchValue({ subject: '' });
      this.subject = '';
      this.noStudent = 'Please Select Subject';
    }
  }

  onSelectSubject() {
    const subject = this.examForm.value.subject;
    if (subject !== '') {
      this.subject = subject;
      this.searchStudent(this.course, this.batch, subject);
    }
  }

  searchStudent(course: string, batch: string, subject: string) {
    this.loading = true;
    this.examService.getStudents(course, batch, subject).subscribe(
      resData => {
        this.error = null;
        this.students = resData;

        if (this.students.length < 1) {
          this.noStudent = 'No Students Found';
        }

        this.students.forEach(student => {
          const marks = {
            student: student._id,
            marks: ''
          };
          this.marks.push(marks);
        });

        this.loading = false;
      },
      errorMessage => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }

  inputmarks(event: any, index: number) {
    this.marks[index].marks = event.target.value;
  }

  saveExam() {
    if (this.branch !== '' && this.examForm.valid) {
      this.loading = true;
      const exam = {
        examTitle: this.examForm.value.examTitle,
        outOfMarks: this.examForm.value.outOfMarks,
        passingMarks: this.examForm.value.passingMarks,
        date: this.date,
        branch: this.branch,
        courseType: this.courseType,
        course: this.examForm.value.course,
        batch: this.examForm.value.batch,
        subject: this.examForm.value.subject,
        marks: this.marks
      };

      this.examService.saveExam(exam).subscribe(
        (val: any) => {
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
