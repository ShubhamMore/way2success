import { Component, OnInit, ElementRef, ViewChild, ChangeDetectorRef, ɵConsole } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseModel, BatchModel, SubjectModel } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/course.service';
import { MediaService } from 'src/app/services/media.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { BranchModel } from 'src/app/models/branch.model';

@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.css']
})
export class AddMediaComponent implements OnInit {

  @ViewChild('videoPlayer', {static: false}) videoPlayer: ElementRef;

  loading: boolean;
  error: boolean;

  mediaPreview: string;
  uploadMedia: File;

  mediaError: boolean;

  months: string[];

  mediaDuration: number;

  form: FormGroup;
  branches: BranchModel[];
  allCourses: CourseModel[];
  courses: CourseModel[];
  batches: BatchModel[];

  subjects: SubjectModel[];

  constructor(private courseService: CourseService,
              private mediaService: MediaService,
              private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.loading = true;
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.branches = [];
    this.allCourses = [];
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.courseService.getBranchesAndCourses()
    .subscribe(
      resData => {
        this.error = null;
        this.allCourses = resData.courses;
        this.branches = resData.branches;
        if (this.courses.length < 1) {

        }
        this.form = new FormGroup({
          title: new FormControl(null, {
            validators: [Validators.required]
          }),
          branch: new FormControl(this.branches[0]._id, {
            validators: [Validators.required]
          }),
          course: new FormControl('', {
            validators: [Validators.required]
          }),
          batch: new FormControl('', {
            validators: [Validators.required]
          }),
          subject: new FormControl(null, {
            validators: [Validators.required]
          }),
          media: new FormControl(null, {
            validators: []
          }),
          date: new FormControl(null, {
            validators: [Validators.required]
          }),
          time: new FormControl(null, {
            validators: [Validators.required]
          })
        });
        this.branchChanged();
        this.changeDetectorRef.detectChanges();
        this.loading = false;
      },
      errorMessage => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }

  branchChanged() {
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.allCourses.forEach(curCourse => {
      if (curCourse.branch === this.form.value.branch) {
        this.courses.push(curCourse);
      }
    });
    this.form.patchValue({
      course: '',
      batch: '',
      subject: ''
    });
  }

  courseChanged() {
    this.batches = [];
    this.subjects = [];
    const course = this.courses.find((cueCourse) => cueCourse._id === this.form.value.course);
    this.batches = course.batch;
    this.form.patchValue({
      batch: '',
      subject: ''
    });
  }

  batchChanged() {
    this.subjects = [];
    const batch = this.batches.find((curBatch) => curBatch._id === this.form.value.batch);
    this.subjects = batch.subjects;
    this.form.patchValue({
      subject: ''
    });
  }

  onMediaPicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) {
      return;
    }
    this.onCancelMedia();
    if (this.mediaValidate(file.name)) {
      this.mediaError = false;
      this.uploadMedia = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.mediaPreview = reader.result as string;
        this.changeDetectorRef.detectChanges();
        this.videoPlayer.nativeElement.onloadedmetadata = () => {
          this.mediaDuration = this.videoPlayer.nativeElement.duration;
        };
      };
      reader.readAsDataURL(file);
      return;
    }
    this.mediaError = true;
  }

  onCancelMedia() {
    this.uploadMedia = null;
    this.mediaPreview = null;
    this.mediaDuration = null;
    this.changeDetectorRef.detectChanges();
  }

  addMedia() {
    if (this.form.invalid) {
      return;
    }

    if (!this.uploadMedia) {
      this.mediaError = true;
      return;
    }

    this.loading = true;

    const date = this.form.value.date.split('-');
    const time = this.form.value.time + ':00';
    const StartTime = this.months[date[1] - 1] + ' ' + date[2] + ', ' + date[0] + ' ' + time;

    const postData = new FormData();
    postData.append('title', this.form.value.title);
    postData.append('branch', this.form.value.branch);
    postData.append('course', this.form.value.course);
    postData.append('batch', this.form.value.batch);
    postData.append('subject', this.form.value.subject);
    postData.append('duration', this.mediaDuration.toString());
    postData.append('startTime', StartTime);
    postData.append('media', this.uploadMedia, this.form.value.title);

    this.mediaService.addMedia(postData)
    .subscribe(
      resData => {
        this.error = null;
        this.resetForm();
        this.loading = false;
        this.location.back();
      },
      errorMessage => {
        this.error = errorMessage;
        this.resetForm();
        this.loading = false;
      }
    );
  }

  resetForm() {
    this.batches = [];
    this.subjects = [];
    this.form.reset();
    this.form.patchValue({course: '', batch: ''});
    this.mediaPreview = null;
    this.uploadMedia = null;
  }

  cancel() {
    this.loading = true;
    this.location.back();
  }

  mediaValidate(fileName: string): boolean {
    const ext: string = fileName.substring(fileName.lastIndexOf('.') + 1);
    if (ext !== 'mp4') {
      return false;
    }
    return true;
  }

  onErrorClose() {
    this.error = null;
  }
}
