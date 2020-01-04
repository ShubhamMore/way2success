import { Component, OnInit } from '@angular/core';
import { AboutService } from '../services/about.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  loading: boolean;
  content: string;
  error: string;
  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.loading = true;
    this.aboutService.getContent().subscribe(
      (resData: any) => {
        this.content = resData.content;
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }
}
