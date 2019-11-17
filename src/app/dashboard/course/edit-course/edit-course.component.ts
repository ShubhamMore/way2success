import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CourseModel, BatchModel, SubjectModel } from 'src/app/models/course.model';
import { Location } from '@angular/common';
import { BranchModel } from 'src/app/models/branch.model';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  id: string;
  course: CourseModel;
    // Forms
  courseForm: FormGroup;
  batchForm: FormGroup;
  subjectForm: FormGroup;
  // Edit Batch Button Flag
  editingBatch = false;
  // Editing Subject Button Flag
  editingSubject = false;
  // Local branches Array
  branches: BranchModel[];
  // Local subjects Array
  subjects: any[];
  subErr = false;
  // Edited SUBJECT index
  editSubjectIndex: number;
  // Edited batch index
  editBatchIndex: number;
  // batches array
  batches: any[];
  loading: boolean;
  error: string;

  constructor(private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.loading = true;
    this.branches = [];
    this.subjects = [];
    this.batches = [];
    this.route.params
    .subscribe(
      (params: Params) => {
        // tslint:disable-next-line: no-string-literal
        this.id = params['id'];
        this.courseService.getCourseForEditing(this.id)
        .subscribe(
          resData => {
            this.error = null;
            this.course = resData.course;
            this.branches = resData.branches;
            if (!this.course) {
              this.router.navigate(['/page_not_found'], {relativeTo: this.route});
              return;
            }
            this.batches = this.course.batch;

            // course form
            this.courseForm = new FormGroup({
              course: new FormControl(this.course.courseName, {
                validators: [Validators.required]
              }),
              branch: new FormControl(this.course.branch, {
                validators: [Validators.required]
              })
            });

            // Batch Form
            this.batchForm = new FormGroup({
              batchName: new FormControl(null, {
                validators: [Validators.required]
              })
            });

            // Subject Form
            this.subjectForm = new FormGroup({
              subject: new FormControl(null, {
                validators: [Validators.required]
              }),
              fee: new FormControl(null, {
                validators: [Validators.required]
              })
            });

            this.loading = false;
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

  // Add Subject
  addSubject() {
    if (this.subjectForm.valid) {
      this.subErr = false;

      const subject = {
        subject: this.subjectForm.value.subject,
        fee: this.subjectForm.value.fee
      };
      this.subjects.push(subject);
      this.resetSubjectForm();
    }
  }

  // Delete Subject
  deleteSubject(index: number) {
    this.subjects.splice(index, 1);
  }

  // Edit Batch
  editSubjectData(index: number) {
    this.editSubjectIndex = index;
    this.editingSubject = true;
    this.subjectForm.patchValue({
      subject: this.subjects[index].subject,
      fee: this.subjects[index].fee
    });
  }

  editSubject(index: number) {
    if (!this.subjectForm.valid) {
      return;
    }
    this.editSubjectIndex = null;
    this.editingSubject = false;
    const subject: SubjectModel = {
      _id: this.subjects[index]._id,
      subject: this.subjectForm.value.subject,
      fee: this.subjectForm.value.fee
    };
    console.log(index, subject);
    this.subjects[index] = subject;
    this.resetSubjectForm();
  }

  // Cancel Edit
  cancelEditSubject() {
    this.editSubjectIndex = null;
    this.editingSubject = false;
    this.resetBatchForm();
  }

  // Reset Subject Form
  resetSubjectForm() {
    this.subjectForm.reset();
  }

  // Add Batch
  addBatch() {
    if (!this.batchForm.valid) {
      return;
    }

    // Subjects are not added
    if (this.subjects.length < 1) {
      this.subErr = true;
      return;
    }

    // Construct batch object
    const batch = {
      batchName: this.batchForm.value.batchName,
      subjects: this.subjects
    };

    // add batch object to array
    this.batches.push(batch);

    this.resetBatchForm();
  }

  // Delete Batch
  deleteBatch(index: number) {
    const batch = this.batches[index];
    this.batches.splice(index, 1);
  }

  // Edit Batch
  editBatchData(index: number) {
    this.editBatchIndex = index;
    this.editingBatch = true;
    this.batchForm.patchValue({
      batchName: this.batches[index].batchName,
    });
    this.subjects = this.batches[index].subjects;
  }

  editBatch(index: number) {
    if (!this.batchForm.valid) {
      return;
    }

    // If Subjects are not added
    if (this.subjects.length < 1) {
      this.subErr = true;
      return;
    }
    this.editBatchIndex = null;
    this.editingBatch = false;
    const batch: BatchModel = {
      _id: this.batches[index]._id,
      batchName: this.batchForm.value.batchName,
      subjects: this.subjects
    };
    this.batches[index] = batch;

    this.resetBatchForm();
  }

  // Cancel Edit Batch
  cancelEditBatch() {
    this.editBatchIndex = null;
    this.editingBatch = false;
    this.resetBatchForm();
  }

  // Reset Batch Form
  resetBatchForm() {
    this.batchForm.reset();
    this.subjects = [];
    this.resetSubjectForm();
  }

  // Add course
  editCourse() {
    if (!this.courseForm.valid) {
      return;
    }

    if (this.batches.length < 1) {
      return;
    }

    const course: CourseModel = {
      _id: this.id,
      courseName: this.courseForm.value.course,
      branch: this.courseForm.value.branch,
      batch: this.batches
    };

    this.courseService.editCourse(course)
    .subscribe(
      resData => {
        this.error = null;
        this.loading = false;
        this.cancel();
      },
      errorMessage => {
        this.loading = false;
        this.error = errorMessage;
      }
    );
  }

  cancel() {
    this.resetBatchForm();
    this.location.back();
  }
}
