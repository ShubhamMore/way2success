import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageService } from '../../../services/image.service';
import { ImageCategoryModel } from '../../../models/image-category.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-image-categories',
  templateUrl: './add-image-categories.component.html',
  styleUrls: ['./add-image-categories.component.css']
})
export class AddImageCategoriesComponent implements OnInit {
  loading: boolean;
  error: string;
  form: FormGroup;
  categories: ImageCategoryModel[];

  constructor(private imageService: ImageService, private location: Location) {}

  ngOnInit() {
    this.loading = true;
    this.categories = [];
    this.form = new FormGroup({
      category: new FormControl(null, {
        validators: [Validators.required]
      })
    });
    this.imageService.getImageCategories().subscribe(
      (resData: any) => {
        this.categories = resData;
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  addCategory() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.imageService.addCategory(this.form.value.category).subscribe(
      (resData: any) => {
        this.ngOnInit();
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  deleteCategory(id: string) {
    const confirm = window.confirm(
      // tslint:disable-next-line: max-line-length
      'Do you really want to Delete this Category?\n If you Delete this Category all the images in this category will be permanantly deleted from Database and Server..\nIf you wish to delete this Click Ok'
    );
    if (confirm) {
      this.loading = true;
      this.imageService.deleteCategory(id).subscribe(
        (resData: any) => {
          this.imageService.imageSearchData.category = '';
          this.ngOnInit();
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    }
  }

  cancel() {
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }
}
