import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  loading: boolean;
  error: string;
  constructor() { }

  ngOnInit() {
    this.loading = true;
    this.loading = false;
  }

}
