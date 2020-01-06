import { Component, OnInit } from '@angular/core';
import { LectureService } from '../../../services/lecture.service';
import { LectureModel } from '../../../models/lecture.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-lecture-content',
  templateUrl: './add-lecture-content.component.html',
  styleUrls: ['./add-lecture-content.component.css']
})
export class AddLectureContentComponent implements OnInit {
  filePreview: string[];
  uploadFiles: File[];

  loading: boolean;
  error: string;
  invalidFile: boolean;

  lecture: LectureModel;

  constructor(
    private lectureService: LectureService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.invalidFile = false;
    this.filePreview = [];
    this.uploadFiles = [];
    this.route.params.subscribe((param: Params) => {
      // tslint:disable-next-line: no-string-literal
      const id = param['id'];
      this.lectureService.getLecture(id).subscribe(
        (resData: any) => {
          this.lecture = resData;
          this.loading = false;
        },
        (error: any) => {
          this.error = error;
          this.loading = false;
        }
      );
    });
  }

  onFilePicked(event: Event) {
    this.invalidFile = false;
    const files = (event.target as HTMLInputElement).files;
    const fileExt: string[] = ['pdf', 'jpg', 'png', 'jpeg'];

    let ext: string = null;
    const n: number = files.length;
    for (let i = 0; i < n; i++) {
      ext = files[i].name.substring(files[i].name.lastIndexOf('.') + 1).toLowerCase();
      if (!(fileExt.indexOf(ext) !== -1)) {
        return (this.invalidFile = true);
      }
    }
    this.invalidFile = false;
    for (let i = 0; i < n; i++) {
      this.uploadFiles.push(files[i]);

      this.filePreview.push(files[i].name);
    }
  }

  onSaveFiles() {
    if (this.uploadFiles.length < 1) {
      this.invalidFile = true;
      return;
    }

    this.loading = true;
    this.invalidFile = false;

    const files = new FormData();
    files.append('lecture', this.lecture._id);
    for (let i = 0; i < this.uploadFiles.length; i++) {
      files.append(
        'content',
        this.uploadFiles[i],
        this.filePreview[i].substring(0, this.filePreview[i].lastIndexOf('.'))
      );
    }

    this.lectureService.newLectureContents(files).subscribe(
      (responce: any) => {
        this.filePreview = [];
        this.uploadFiles = [];
        this.cancel();
      },
      (error: any) => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  cancelFile(index: number) {
    this.filePreview.splice(index, 1);
    this.uploadFiles.splice(index, 1);
  }

  cancel() {
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }
}
