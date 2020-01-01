import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../services/about.service';
import { AboutModel } from '../../models/about.model'
import { TopperService } from 'src/app/services/topper.service';;
import { TopperModel } from 'src/app/models/topper.model';

@Component({
  selector: 'app-content-about',
  templateUrl: './content-about.component.html',
  styleUrls: ['./content-about.component.css']
})
export class ContentAboutComponent implements OnInit {
  loading: boolean;
  error: string;
  about: AboutModel;
  toppers:TopperModel;

  constructor(private aboutService: AboutService,private topperService: TopperService) {}

  ngOnInit() {
    this.loading = true;
    this.aboutService.getAbout().subscribe(
      (resData: any) => {
        this.about = resData;
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );

    this.topperService.getToppers()
    .subscribe(
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
}
