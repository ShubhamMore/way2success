import { Component, OnInit } from '@angular/core';
import { TopperService } from 'src/app/services/topper.service';
import { TopperModel } from 'src/app/models/topper.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topper',
  templateUrl: './topper.component.html',
  styleUrls: ['./topper.component.css']
})
export class TopperComponent implements OnInit {
  toppers: TopperModel[];
  loading: boolean;
  error: string;
  year: string;
  years: string[];

  constructor(
    private topperService: TopperService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.toppers = [];
    this.years = [];
    const curYear = new Date().getFullYear();
    this.year = curYear.toString();
    for (let year = 2017; year <= curYear; year++) {
      this.years.push(year.toString());
    }
    this.getToppers(this.year);
  }

  getToppers(year: string) {
    this.loading = true;
    this.year = year;
    this.topperService.getToppersByYear(year).subscribe(
      (resData: any) => {
        this.toppers = resData;
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  editTopper(id: string) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  deleteTopper(id: string) {
    this.loading = true;
    this.topperService.deleteTopper(id).subscribe(
      (resData: any) => {
        this.getToppers(this.year);
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  onErrorClose() {
    this.error = null;
  }
}
