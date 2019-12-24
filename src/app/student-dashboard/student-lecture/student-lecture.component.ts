import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { LectureService } from '../../services/lecture.service';
import { StudentService } from '../../services/student.service';
import { LectureModel } from 'src/app/models/lecture.model';

@Component({
  selector: 'app-student-lecture',
  templateUrl: './student-lecture.component.html',
  styleUrls: ['./student-lecture.component.css']
})
export class StudentLectureComponent implements OnInit {
  id: string;

  loading: boolean;
  error: string;

  lectures: LectureModel[];

  studentData: any;

  subject: string;

  constructor(
    private studentService: StudentService,
    private lectureService: LectureService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.loading = true;
    this.studentData = null;
    this.lectures = [];
    this.subject = '';

    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];
      this.studentService.getStudentDataForLecture(this.id).subscribe(
        (resData: any) => {
          this.error = null;
          this.studentData = resData;
          this.subject = this.studentData.subjects[0]._id;
          this.searchLecture(this.studentData.course, this.studentData.batch, this.subject);
          this.loading = false;
        },
        (errorMessage: any) => {
          this.error = errorMessage;
          this.loading = false;
        }
      );
    });
  }

  onSelectSubject(subject: string) {
    this.subject = subject;
    if (subject !== '') {
      this.searchLecture(this.studentData.course, this.studentData.batch, this.subject);
    }
  }

  searchLecture(course: string, batch: string, subject: string) {
    this.lectureService.getLecturesForStudent(course, batch, subject).subscribe(
      resData => {
        this.error = null;
        this.lectures = resData;
        this.loading = false;
      },
      errorMessage => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }

  onErrorClose() {
    this.error = null;
  }
}
