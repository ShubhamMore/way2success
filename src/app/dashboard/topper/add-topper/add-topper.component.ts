import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TopperService } from '../../../services/topper.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-topper',
  templateUrl: './add-topper.component.html',
  styleUrls: ['./add-topper.component.css']
})
export class AddTopperComponent implements OnInit {
  loading: boolean;
  error: string;

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

    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required]
      }),
      year: new FormControl(this.year, {
        validators: [Validators.required]
      }),
      score: new FormControl(null, {
        validators: [Validators.required]
      }),
      details: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: []
      })
    });
    this.onCancelImage();
    this.loading = false;
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

  addTopper() {
    if (this.form.invalid) {
      this.formError = true;
      return;
    } else if (!this.uploadImage) {
      this.imageError = true;
      return;
    } else {
      this.loading = true;
      const topper = new FormData();
      topper.append('name', this.form.value.name);
      topper.append('year', this.form.value.year);
      topper.append('score', this.form.value.score);
      topper.append('details', this.form.value.details);
      topper.append('image', this.uploadImage);

      this.topperService.addTopper(topper).subscribe(
        (resData: any) => {
          this.ngOnInit();
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
    const ext: string = fileName.substring(fileName.lastIndexOf('.') + 1);
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
