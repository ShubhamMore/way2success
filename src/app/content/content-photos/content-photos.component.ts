import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-photos',
  templateUrl: './content-photos.component.html',
  styleUrls: ['./content-photos.component.css']
})
export class ContentPhotosComponent implements OnInit {

  loading: boolean;
  error: string;
  constructor() { }

  ngOnInit() {
    this.loading = true;
    this.loading = false;
  }

}
