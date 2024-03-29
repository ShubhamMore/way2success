import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseModel, BatchModel, SubjectModel } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { MediaService } from '../../services/media.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MediaModel } from '../../models/media.model';
import { BranchModel } from '../../models/branch.model';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  loading: boolean;

  error: boolean;

  form: FormGroup;

  allMedia: MediaModel[];

  branches: BranchModel[];
  branch: string;

  allCourses: CourseModel[];
  courses: CourseModel[];
  course: string;

  courseType: string;

  batches: BatchModel[];
  batch: string;

  subjects: SubjectModel[];
  subject: string;

  noMedia: string;

  constructor(
    private courseService: CourseService,
    private mediaService: MediaService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.noMedia = 'Please Select Branch';
    this.allMedia = [];
    this.branches = [];
    this.allCourses = [];
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.branch = this.mediaService.mediaSearchData.branch;
    this.courseType = this.mediaService.mediaSearchData.courseType;
    this.course = this.mediaService.mediaSearchData.course;
    this.batch = this.mediaService.mediaSearchData.batch;
    this.subject = this.mediaService.mediaSearchData.subject;
    this.courseService.getBranchesAndCourses().subscribe(
      (resData: any) => {
        this.error = null;
        this.allCourses = resData.courses;
        this.branches = resData.branches;
        this.form = new FormGroup({
          course: new FormControl('', {
            validators: [Validators.required]
          }),
          batch: new FormControl('', {
            validators: [Validators.required]
          }),
          subject: new FormControl('', {
            validators: [Validators.required]
          })
        });
        if (this.branch !== '') {
          this.onSelectBranch(this.branch);
          if (this.course !== '') {
            this.form.patchValue({ course: this.course });
            this.courseChanged();
            this.form.patchValue({ batch: this.batch });
            this.batchChanged();
            this.form.patchValue({ subject: this.subject });
            this.subjectChanged();
          } else {
            this.loading = false;
          }
        } else {
          this.onSelectBranch(this.branches[0]._id);
          this.loading = false;
        }
      },
      (errorMessage: any) => {
        this.error = errorMessage;
        this.loading = false;
      }
    );
  }

  onSelectBranch(branch: string) {
    if (branch !== '') {
      this.allMedia = [];
      this.courses = [];
      this.batches = [];
      this.subjects = [];
      this.branch = branch;
      this.mediaService.mediaSearchData.branch = this.branch;
      this.mediaService.mediaSearchData.course = '';
      this.mediaService.mediaSearchData.batch = '';
      this.mediaService.mediaSearchData.subject = '';
      this.allCourses.forEach(curCourse => {
        if (curCourse.branch === branch && curCourse.courseType === this.courseType) {
          this.courses.push(curCourse);
        }
      });
      this.form.reset({
        course: '',
        batch: '',
        subject: ''
      });
      this.noMedia = 'Please Select Course';
    }
  }

  onSelectCourseType(courseType: string) {
    this.allMedia = [];
    this.courses = [];
    this.batches = [];
    this.subjects = [];
    this.courseType = courseType;
    this.mediaService.mediaSearchData.courseType = this.courseType;
    this.mediaService.mediaSearchData.course = '';
    this.mediaService.mediaSearchData.batch = '';
    this.mediaService.mediaSearchData.subject = '';
    this.allCourses.forEach(curCourse => {
      if (curCourse.branch === this.branch && curCourse.courseType === courseType) {
        this.courses.push(curCourse);
      }
    });
    this.form.reset({
      course: '',
      batch: '',
      subject: ''
    });
    this.noMedia = 'Please Select Course';
  }

  courseChanged() {
    const id = this.form.value.course;
    if (id !== '') {
      this.batches = [];
      this.subjects = [];
      this.course = this.mediaService.mediaSearchData.course = id;
      const course = this.courses.find(curcourse => curcourse._id === id);
      this.batches = course.batch;
      this.form.patchValue({ batch: '', subject: '' });
      this.noMedia = 'Please Select Batch';
    }
  }

  batchChanged() {
    const id = this.form.value.batch;
    if (id !== '') {
      this.subjects = [];
      this.batch = this.mediaService.mediaSearchData.batch = id;
      const batch = this.batches.find(curBatch => curBatch._id === id);
      this.subjects = batch.subjects;
      this.form.patchValue({ subject: '' });
      this.noMedia = 'Please Select Subject';
    }
  }

  subjectChanged() {
    const id = this.form.value.subject;
    if (id !== '') {
      this.subject = this.mediaService.mediaSearchData.subject = id;
      const media = this.form.value;
      this.searchMedia(media);
    }
  }

  searchMedia(media: any) {
    this.loading = true;
    this.mediaService.getAllMedia(media).subscribe(
      (resData: any) => {
        this.error = null;
        this.allMedia = resData;
        if (this.allMedia.length < 1) {
          this.noMedia = 'No Media Available';
        }
        this.loading = false;
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  editMedia(id: string) {
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  showMedia(id: string) {
    this.router.navigate([id, 'show'], { relativeTo: this.route });
  }

  deleteMedia(id: string) {
    const confirm = window.confirm(
      // tslint:disable-next-line: max-line-length
      'Do you really want to Delete this Media?\n If you Delete this Exam all the media related data will be permanantly deleted from Database.., and media file will be disappere from server..\nIf you wish to delete this Click Ok'
    );
    if (confirm) {
      this.loading = true;
      this.mediaService.deleteMedia(id).subscribe(
        (resData: any) => {
          this.error = null;
          const i = this.allMedia.findIndex(curMedia => curMedia._id === id);
          this.allMedia.splice(i, 1);
          if (this.allMedia.length < 1) {
            this.noMedia = 'No Media Available';
          }
          this.loading = false;
        },
        (errorMessage: any) => {
          this.error = errorMessage;
          this.loading = false;
        }
      );
    }
  }

  onErrorClose() {
    this.error = null;
  }
}
