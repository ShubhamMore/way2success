import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboard: any;
  loading: boolean;
  error: string;
  constructor(private dashboardService: DashboardService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading = true;
    this.dashboardService.getDashboardData()
      .subscribe(
        (resData: any) => {
          this.dashboard = resData;
          this.loading = false;
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
  }

  addStudent() {
    this.router.navigate(['student', 'new'], {relativeTo: this.route});
  }

  addBranch() {
    this.router.navigate(['branch', 'new'], {relativeTo: this.route});
  }

  addCourse() {
    this.router.navigate(['course', 'new'], {relativeTo: this.route});
  }

  addImages() {
    this.router.navigate(['image', 'new'], {relativeTo: this.route});
  }

  addTopper() {
    this.router.navigate(['topper', 'new'], {relativeTo: this.route});
  }

  addMedia() {
    this.router.navigate(['media', 'new'], {relativeTo: this.route});
  }

  addExam() {
    this.router.navigate(['exam', 'new'], {relativeTo: this.route});
  }

}
