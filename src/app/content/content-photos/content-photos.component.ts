import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-content-photos',
  templateUrl: './content-photos.component.html',
  styleUrls: ['./content-photos.component.css']
})
export class ContentPhotosComponent implements OnInit {
  loading: boolean;
  categories: any;
  error: string;
  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.loading = true;
    this.imageService.getImageCategoriesForContent().subscribe(
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
}
