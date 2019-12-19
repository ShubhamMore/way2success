import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExamService } from 'src/app/services/exam.service';
import { MarksModel, ExamModel } from 'src/app/models/exam.model';

@Component({
  selector: 'app-show-exam',
  templateUrl: './show-exam.component.html',
  styleUrls: ['./show-exam.component.css']
})
export class ShowExamComponent implements OnInit {
  loading: boolean;

  exam: ExamModel;

  examMetaData: any;

  marks: MarksModel[];

  error: string;
  constructor(
    private examService: ExamService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.marks = [];
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = params['id'];
      this.examService.getExam(id).subscribe(
        resData => {
          this.error = null;
          this.exam = resData.exam;
          this.examMetaData = resData.examMetaData;
          this.marks = this.exam.marks;
          this.loading = false;
        },
        errorMessage => {
          this.error = errorMessage;
          this.loading = false;
        }
      );
    });
  }

  checkPassFail(marks: string, passingMarks: string): boolean {
    if (+marks >= +passingMarks) {
      return true;
    }
    return false;
  }

  editExam() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  cancel() {
    this.router.navigate(['/admin', 'exam'], { relativeTo: this.route });
  }

  onErrorClose() {
    this.error = null;
  }
}
