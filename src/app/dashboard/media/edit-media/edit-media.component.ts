import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseModel, BatchModel, SubjectModel } from '../../..//models/course.model';
import { CourseService } from '../../../services/course.service';
import { MediaService } from '../../../services/media.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-media',
  templateUrl: './edit-media.component.html',
  styleUrls: ['./edit-media.component.css']
})
export class EditMediaComponent implements OnInit {
  loading: boolean;
  error: boolean;

  months: string[];

  form: FormGroup;

  branches: CourseModel[];
  allCourses: CourseModel[];
  courses: CourseModel[];
  batches: BatchModel[];

  subjects: SubjectModel[];

  media: any;
  id: string;

  constructor(
    private courseService: CourseService,
    private mediaService: MediaService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    this.branches = [];
    this.allCourses = [];
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];
      this.mediaService.getMediaforEditing(this.id).subscribe(
        resData => {
          this.error = null;
          this.media = resData.media;
          // If no media available
          if (!this.media) {
            this.router.navigate(['/page_not_found'], { relativeTo: this.route });
            return;
          }
          this.allCourses = resData.courses;
          this.branches = resData.branches;
          this.form = new FormGroup({
            title: new FormControl(this.media.title, {
              validators: [Validators.required]
            }),
            branch: new FormControl(this.media.branch, {
              validators: [Validators.required]
            }),
            courseType: new FormControl(this.media.courseType, {
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
            date: new FormControl(null, {
              validators: [Validators.required]
            }),
            time: new FormControl(null, {
              validators: [Validators.required]
            })
          });
          this.branchChanged();
          this.form.patchValue({ course: this.media.course });
          this.courseChanged();
          this.form.patchValue({ batch: this.media.batch });
          this.batchChanged();
          this.form.patchValue({ subject: this.media.subject });

          const startDateTime = this.media.startTime.split(' ');
          const date =
            startDateTime[2] +
            '-' +
            this.month(startDateTime[0]) +
            '-' +
            startDateTime[1].replace(',', '');
          this.form.patchValue({ date });

          const startTime = startDateTime[3].split(':');
          const time = startTime[0] + ':' + startTime[1];
          this.form.patchValue({ time });

          this.loading = false;
        },
        errorMessage => {
          this.loading = false;
          this.error = errorMessage;
          this.router.navigate(['/page_not_found'], { relativeTo: this.route });
        }
      );
    });
  }

  month(month: string) {
    const m = this.months.indexOf(month) + 1;
    if (m < 10) {
      return '0' + m;
    }
    return m.toString();
  }

  branchChanged() {
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.allCourses.forEach(curCourse => {
      if (
        curCourse.branch === this.form.value.branch &&
        curCourse.courseType === this.form.value.courseType
      ) {
        this.courses.push(curCourse);
      }
    });
    this.form.patchValue({
      course: '',
      batch: '',
      subject: ''
    });
  }

  courseTypeChanged() {
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.allCourses.forEach(curCourse => {
      if (
        curCourse.branch === this.form.value.branch &&
        curCourse.courseType === this.form.value.courseType
      ) {
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
    const course = this.courses.find(curCourse => curCourse._id === this.form.value.course);
    this.batches = course.batch;
    this.form.patchValue({
      batch: '',
      subject: ''
    });
  }

  batchChanged() {
    this.subjects = [];
    const batch = this.batches.find(curBatch => curBatch._id === this.form.value.batch);
    this.subjects = batch.subjects;
    this.form.patchValue({
      subject: ''
    });
  }

  editMedia() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    const date = this.form.value.date.split('-');
    const time = this.form.value.time + ':00';
    const StartTime = this.months[date[1] - 1] + ' ' + date[2] + ', ' + date[0] + ' ' + time;

    const media = {
      _id: this.id,
      title: this.form.value.title,
      branch: this.form.value.branch,
      courseType: this.form.value.courseType,
      course: this.form.value.course,
      batch: this.form.value.batch,
      subject: this.form.value.subject,
      media: this.media.media,
      duration: this.media.duration,
      startTime: StartTime
    };

    this.mediaService.editMedia(media).subscribe(
      resData => {
        this.error = null;
        this.loading = false;
        this.location.back();
      },
      errorMessage => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
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
