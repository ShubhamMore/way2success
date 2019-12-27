import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { MediaService } from '../../../services/media.service';
import { MediaModel } from '../../../models/media.model';

@Component({
  selector: 'app-show-media',
  templateUrl: './show-media.component.html',
  styleUrls: ['./show-media.component.css']
})
export class ShowMediaComponent implements OnInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer: ElementRef;

  loading: boolean;

  id: string;

  error: string;

  media: MediaModel;

  // Update the count down every 1 second

  constructor(
    private mediaService: MediaService,
    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];
      this.mediaService.getMedia(this.id).subscribe(
        (resData: any) => {
          this.error = null;
          this.media = resData;

          // If no media available
          if (!this.media) {
            this.router.navigate(['/page_not_found'], { relativeTo: this.route });
            return;
          }
          this.loading = false;
        },
        (errorMessage: any) => {
          this.loading = false;
          this.error = errorMessage;
          this.router.navigate(['/page_not_found'], { relativeTo: this.route });
        }
      );
    });
  }

  onErrorClose() {
    this.error = null;
  }
}
