import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageService } from '../../../services/image.service';
import { ImageCategoryModel } from '../../../models/image-category.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-images',
  templateUrl: './add-images.component.html',
  styleUrls: ['./add-images.component.css']
})
export class AddImagesComponent implements OnInit {
  imagePreview: string[];
  uploadImages: File[];
  categories: ImageCategoryModel[];
  form: FormGroup;
  loading: boolean;
  error: string;
  invalidImage: boolean;

  constructor(
    private imageService: ImageService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.invalidImage = false;
    this.imagePreview = [];
    this.uploadImages = [];
    this.form = new FormGroup({
      category: new FormControl('', {
        validators: [Validators.required]
      })
    });
    this.imageService.getImageCategories().subscribe(
      (resData: any) => {
        this.categories = resData;
        if (this.categories.length > 0) {
          this.form.patchValue({ category: this.categories[0]._id });
        }
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  onImagePicked(event: Event) {
    this.invalidImage = false;
    const files = (event.target as HTMLInputElement).files;
    const imgExt: string[] = ['jpg', 'png'];
    let ext: string = null;
    const n: number = files.length;
    for (let i = 0; i < n; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1);
      if (!(imgExt.indexOf(ext) !== -1)) {
        return (this.invalidImage = true);
      }
    }
    this.invalidImage = false;
    for (let i = 0; i < n; i++) {
      this.uploadImages.push(files[i]);
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview.push(reader.result as string);
      };
      reader.readAsDataURL(files[i]);
    }
  }

  onSaveImages() {
    if (this.form.invalid) {
      return;
    } else if (this.uploadImages.length < 1) {
      this.invalidImage = true;
      return;
    }

    this.loading = true;
    this.invalidImage = false;

    const images = new FormData();
    images.append('category', this.form.value.category);
    for (let i = 0; i < this.uploadImages.length; i++) {
      images.append('image', this.uploadImages[i], this.form.value.category + i);
    }

    this.imageService.addImages(images).subscribe(
      (responce: any) => {
        this.imagePreview = [];
        this.uploadImages = [];
        this.form.reset();
        this.cancel();
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  cancelImage(index: number) {
    this.imagePreview.splice(index, 1);
    this.uploadImages.splice(index, 1);
  }

  addCategory() {
    this.loading = true;
    this.router.navigate(['/admin', 'image', 'category'], { relativeTo: this.route });
  }

  cancel() {
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }
}
