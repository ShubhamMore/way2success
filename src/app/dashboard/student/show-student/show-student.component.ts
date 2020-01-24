import { Component, OnInit } from '@angular/core';
import { StudentModel } from 'src/app/models/student.model';
import { StudentService } from 'src/app/services/student.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show-student',
  templateUrl: './show-student.component.html',
  styleUrls: ['./show-student.component.css']
})
export class ShowStudentComponent implements OnInit {
  loading: boolean;
  error: boolean;
  student: StudentModel;
  studentMetaData: any;
  id: string;

  constructor(
    private studentService: StudentService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];
      this.studentService.getStudent(this.id).subscribe(
        (resData: any) => {
          this.error = null;
          this.student = resData.student;
          if (!this.student) {
            this.router.navigate(['/page_not_found'], { relativeTo: this.route });
            return;
          }
          this.studentMetaData = resData.studentMetaData;
          this.loading = false;
        },
        (errorMessage: any) => {
          this.error = errorMessage;
          this.loading = false;
          this.router.navigate(['/page_not_found'], { relativeTo: this.route });
        }
      );
    });
  }

  subjects(subjects: any) {
    const subject: string[] = [];
    subjects.forEach(curSubject => {
      subject.push(curSubject.subject);
    });
    return subject.join(', ');
  }

  studentAttendance() {
    this.router.navigate(['attendance'], { relativeTo: this.route });
  }

  studentPerformance() {
    this.router.navigate(['performance'], { relativeTo: this.route });
  }

  studentHistory() {
    this.router.navigate(['history'], { relativeTo: this.route });
  }

  studentReceipts() {
    this.router.navigate(['receipt'], { relativeTo: this.route });
  }

  cancel() {
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }
}
