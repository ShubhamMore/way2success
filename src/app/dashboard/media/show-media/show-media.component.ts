import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { MediaService } from '../../../services/media.service';
import { MediaModel } from '../../../models/MediaModel';

@Component({
  selector: 'app-show-media',
  templateUrl: './show-media.component.html',
  styleUrls: ['./show-media.component.css']
})

export class ShowMediaComponent implements OnInit {

  @ViewChild('videoPlayer', {static: false}) videoPlayer: ElementRef;

  loading: boolean;

  id: string;

  error: string;

  media: MediaModel;

  waitingToStart: string;

  videoPrepared: boolean;

  // Update the count down every 1 second

  constructor(private mediaService: MediaService,
              private router: Router,
              private route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loading = true;
    this.videoPrepared = false;
    this.route.params
    .subscribe(
      (params: Params) => {
        // tslint:disable-next-line: no-string-literal
        this.id = params['id'];
        console.log(this.id);
        this.mediaService.getMedia(this.id)
        .subscribe(
          resData => {
            this.error = null;
            this.media = resData;
            console.log(resData);
            this.loading = false;

            // If no media available
            if (!this.media) {
              this.router.navigate(['/page_not_found'], {relativeTo: this.route});
              return;
            }

            // Set Count Down Date
            const countDownDate = new Date(this.media.startTime).getTime();

            // Set Interval
            const x = setInterval(() => {
              // Get today's date and time
              const now = new Date().getTime();

              // Find the distance time between current date and the count down date
              const distance = countDownDate - now;

              // Time calculations for days, hours, minutes and seconds
              const days = Math.floor(distance / (1000 * 60 * 60 * 24));
              const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
              const seconds = Math.floor((distance % (1000 * 60)) / 1000);

              // Output the result in an 'waitingToStart' object variable
              this.waitingToStart = 'Video will Start In \n' + days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

              // If the count down is over
              if (distance < 0) {
                // Clear Interval
                clearInterval(x);

                // Set Message while preparing video
                this.waitingToStart = 'Video Loading..';

                // Buffer time is 10 seconds (For calulating Video Data)
                const bufferTime = 60;

                // Calculate current Time
                let currentTime: number = Math.floor((new Date().getTime() - countDownDate) / 1000);

                // If current time is greater than duration plus buffer time, then video is expired
                if (currentTime > (parseFloat(this.media.duration) + bufferTime)) {
                  this.waitingToStart = 'Video Expired';
                  return;
                }
                // If current time is greater than video duration without buffer time
                if (currentTime > parseFloat(this.media.duration)) {
                  currentTime = parseFloat(this.media.duration);
                }

                // Calculate media timeout
                const mediaTimeOut: number = (Math.ceil(parseFloat(this.media.duration)) - currentTime + bufferTime) * 1000;

                // set 'waitingToStart' Variable to null
                this.waitingToStart = null;
                this.videoPrepared = true;

                // Detect Video Element
                this.changeDetectorRef.detectChanges();
                // set Video Current Time
                this.videoPlayer.nativeElement.currentTime = currentTime;
                // set Video to Autoplay
                this.videoPlayer.nativeElement.autoplay = true;

                // Set timeout to media timeout
                setTimeout(() => {
                  // Time is over then video is expire
                  this.waitingToStart = 'Video Expired';
                  this.videoPrepared = false;
                }, mediaTimeOut);
              }
            }, 1000);
          },
          errorMessage => {
            this.loading = false;
            this.error = errorMessage;
            this.router.navigate(['/page_not_found'], {relativeTo: this.route});
          }
        );
      }
    );
  }
}
