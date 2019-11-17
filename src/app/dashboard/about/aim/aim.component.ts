import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about.service';
import { AboutModel } from 'src/app/models/about.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-aim',
  templateUrl: './aim.component.html',
  styleUrls: ['./aim.component.css']
})
export class AimComponent implements OnInit {

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
      aim: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.aboutService.getAbout()
    .subscribe(
      (resdata: any) => {
        this.about = resdata;
        if (this.about && this.about.aim !== '') {
          this.edit = false;
          this.form.setValue({aim: this.about.aim});
        }
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  saveAim() {
    if (this.form.valid) {
      const about: any = {
        aim: this.form.value.aim
      };
      if (this.about) {
        about._id = this.about._id;
        about.vision = this.about.vision;
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

  editAim() {
    this.edit = true;
  }

  cancel() {
    this.edit = false;
  }
}
