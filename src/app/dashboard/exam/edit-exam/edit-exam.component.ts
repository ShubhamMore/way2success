import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExamService } from 'src/app/services/exam.service';
import { MarksModel, ExamModel } from 'src/app/models/exam.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css']
})
export class EditExamComponent implements OnInit {
  id: string;

  loading: boolean;

  examForm: FormGroup;

  examMetaData: any;
  exam: ExamModel;

  marks: MarksModel[] = [];

  error: string;

  date: string;

  constructor(
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];
      this.examService.getExam(this.id).subscribe(
        resData => {
          this.error = null;
          this.exam = resData.exam;
          this.examMetaData = resData.examMetaData;
          this.marks = this.exam.marks;
          this.date = this.exam.date;
          this.examForm = new FormGroup({
            examTitle: new FormControl(this.exam.examTitle, {
              validators: [Validators.required]
            }),
            outOfMarks: new FormControl(this.exam.outOfMarks, {
              validators: [Validators.required]
            }),
            passingMarks: new FormControl(this.exam.passingMarks, {
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
    });
  }

  inputmarks(event: any, index: number) {
    this.marks[index].marks = event.target.value;
  }

  saveExam() {
    if (this.examForm.valid) {
      this.loading = true;
      const exam: ExamModel = {
        _id: this.exam._id,
        examTitle: this.examForm.value.examTitle,
        outOfMarks: this.examForm.value.outOfMarks,
        passingMarks: this.examForm.value.passingMarks,
        date: this.date,
        branch: this.exam.branch,
        courseType: this.exam.courseType,
        course: this.exam.course,
        batch: this.exam.batch,
        subject: this.exam.subject,
        marks: this.marks
      };

      this.examService.editExam(exam._id, exam).subscribe(
        val => {
          this.location.back();
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
    }
  }

  onErrorClose() {
    this.error = null;
  }
}
