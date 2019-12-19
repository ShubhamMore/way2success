import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about.service';
import { AboutModel } from 'src/app/models/about.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
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
      mission: new FormControl(null, {
        validators: []
      })
    });
    this.aboutService.getAbout().subscribe(
      (resdata: any) => {
        this.about = resdata;
        if (this.about && this.about.mission !== '') {
          this.edit = false;
          this.form.setValue({ mission: this.about.mission });
        }
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  saveMission() {
    if (this.form.valid) {
      const about: any = {
        mission: this.form.value.mission
      };
      if (this.about) {
        about._id = this.about._id;
        about.aim = this.about.aim;
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

  editMission() {
    this.edit = true;
  }

  cancel() {
    this.edit = false;
  }

  onErrorClose() {
    this.error = null;
  }
}
