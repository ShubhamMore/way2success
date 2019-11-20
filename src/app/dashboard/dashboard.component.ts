import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
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
