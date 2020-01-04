import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about.service';
import { AboutModel } from 'src/app/models/about.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-about-content',
  templateUrl: './about-content.component.html',
  styleUrls: ['./about-content.component.css']
})
export class AboutContentComponent implements OnInit {
  loading: boolean;
  edit: boolean;
  error: string;
  about: AboutModel;
  form: FormGroup;

  constructor(private aboutService: AboutService) {}

  ngOnInit() {
    this.loading = true;
    this.edit = true;
    this.form = new FormGroup({
      content: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.aboutService.getAbout().subscribe(
      (resdata: any) => {
        this.about = resdata;
        if (this.about && this.about.content !== '') {
          this.edit = false;
          this.form.setValue({ content: this.about.content });
        }
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  saveContent() {
    if (this.form.valid) {
      const about: any = {
        content: this.form.value.content
      };
      if (this.about) {
        about._id = this.about._id;
        about.vision = this.about.vision;
      }
      this.loading = true;
      this.aboutService.saveAbout(about).subscribe(
        (resdata: any) => {
          this.ngOnInit();
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }

  editContent() {
    this.edit = true;
  }

  cancel() {
    this.edit = false;
  }

  onErrorClose() {
    this.error = null;
  }
}
