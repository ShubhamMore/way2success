import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TopperService } from '../../../services/topper.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TopperModel } from '../../../models/topper.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-topper',
  templateUrl: './edit-topper.component.html',
  styleUrls: ['./edit-topper.component.css']
})
export class EditTopperComponent implements OnInit {
  loading: boolean;
  error: string;

  topper: TopperModel;

  imagePreview: string;
  uploadImage: File;

  imageError: boolean;

  form: FormGroup;

  formError: boolean;

  year: string;
  years: string[];

  constructor(
    private topperService: TopperService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.loading = true;
    this.formError = false;
    this.years = [];
    const curYear = new Date().getFullYear();
    this.year = curYear.toString();
    for (let year = 2017; year <= curYear; year++) {
      this.years.push(year.toString());
    }

    this.route.params.subscribe((param: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = param['id'];
      this.topperService.getTopper(id).subscribe(
        (resData: any) => {
          this.topper = resData;
          this.form = new FormGroup({
            name: new FormControl(this.topper.name, {
              validators: [Validators.required]
            }),
            year: new FormControl(this.topper.year, {
              validators: [Validators.required]
            }),
            score: new FormControl(this.topper.score, {
              validators: [Validators.required]
            }),
            details: new FormControl(this.topper.details, {
              validators: [Validators.required]
            }),
            image: new FormControl(null, {
              validators: []
            })
          });
          this.onCancelImage();
          this.loading = false;
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) {
      return;
    }
    this.onCancelImage();
    if (this.imageValidate(file.name)) {
      this.imageError = false;
      this.uploadImage = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
      return;
    }
    this.imageError = true;
  }

  onCancelImage() {
    this.uploadImage = null;
    this.imagePreview = null;
    this.imageError = false;
    this.form.patchValue({ image: null });
  }

  saveTopper() {
    if (this.form.invalid) {
      this.formError = true;
      return;
    } else {
      this.loading = true;
      const topper = new FormData();
      topper.append('_id', this.topper._id);
      topper.append('name', this.form.value.name);
      topper.append('year', this.form.value.year);
      topper.append('score', this.form.value.score);
      topper.append('details', this.form.value.details);
      if (this.uploadImage) {
        topper.append('image', this.uploadImage);
      }

      this.topperService.editTopper(topper).subscribe(
        (resData: any) => {
          this.location.back();
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }

  imageValidate(fileName: string): boolean {
    const extension = ['jpg', 'jpeg', 'png'];
    const ext: string = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    if (!extension.includes(ext)) {
      return false;
    }
    return true;
  }

  cancel() {
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }
}
