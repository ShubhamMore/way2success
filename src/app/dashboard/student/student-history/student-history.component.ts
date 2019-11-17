import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HistoryService } from 'src/app/services/history.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-history',
  templateUrl: './student-history.component.html',
  styleUrls: ['./student-history.component.css']
})
export class StudentHistoryComponent implements OnInit {

  courses: any[];
  branch: any;

  loading: boolean;
  error: string;

  constructor(private historyService: HistoryService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.loading = true;
    this.courses = [];
    this.route.params
    .subscribe(
      (params: Params) => {
        // tslint:disable-next-line: no-string-literal
        const student = params['id'];
        this.historyService.getStudentHistory(student)
        .subscribe(
          resData => {
            this.error = null;
            this.courses = resData.history;
            this.branch = resData.branch;
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

  cancel() {
    this.location.back();
  }
}
