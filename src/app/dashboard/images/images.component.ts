import { Component, OnInit } from '@angular/core';
import { ImageModel } from '../../models/image.model';
import { ImageCategoryModel } from '../../models/image-category.model';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  images: ImageModel[];
  categories: ImageCategoryModel[];
  category: string;
  loading: boolean;
  error: string;

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.loading = true;
    this.images = [];
    this.categories = [];
    this.category = this.imageService.imageSearchData.category;
    this.imageService.getImageCategories()
    .subscribe(
      (resData: any) => {
        this.categories = resData;
        if (this.categories.length > 0) {
          if (this.category === '') {
            this.getImages(this.categories[0]._id);
          } else {
            this.getImages(this.category);
          }
          return;
        }
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  getImages(category: string) {
    if (category !== '') {
      this.loading = true;
      this.category = category;
      this.imageService.imageSearchData.category = this.category;
      this.images = [];
      this.imageService.getImagesByCategory(this.category)
      .subscribe((response: ImageModel[]) => {
        this.images = response;
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      });
    }
  }

  deleteImage(id: string) {
    this.loading = true;
    this.imageService.deleteImage(id)
    .subscribe((responce: any) => {
      this.ngOnInit();
    },
    (error: any) => {
      this.error = error;
      this.loading = false;
    });
  }

  onErrorClose() {
    this.error = null;
  }

}
