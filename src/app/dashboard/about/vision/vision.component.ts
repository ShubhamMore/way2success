import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about.service';
import { AboutModel } from 'src/app/models/about.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-vision',
  templateUrl: './vision.component.html',
  styleUrls: ['./vision.component.css']
})
export class VisionComponent implements OnInit {

  loading: boolean;
  edit: boolean;
  error: string;
  about: AboutModel;
  form: FormGroup;

  constructor(private aboutService: AboutService) { }

  ngOnInit() {
    this.loading = true;
    this.edit = true;
    this.form = new FormGroup({
      vision: new FormControl(null, {
        validators: []
      })
    });
    this.aboutService.getAbout()
    .subscribe(
      (resdata: any) => {
        this.about = resdata;
        if (this.about && this.about.vision !== '') {
          this.edit = false;
          this.form.setValue({vision: this.about.vision});
        }
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  saveVision() {
    if (this.form.valid) {
      const about: any = {
        vision: this.form.value.vision
      };
      if (this.about) {
        about._id = this.about._id;
        about.aim = this.about.aim;
        about.mission = this.about.mission;
      }
      this.loading = true;
      this.aboutService.saveAbout(about)
      .subscribe(
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

  editVision() {
    this.edit = true;
  }

  cancel() {
    this.edit = false;
  }

  onErrorClose() {
    this.error = null;
  }
}
