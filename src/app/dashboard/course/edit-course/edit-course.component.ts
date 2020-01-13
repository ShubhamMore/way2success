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
  newSubjects: any[];
  newSubject: boolean;
  subErr = false;
  // Edited SUBJECT index
  editSubjectIndex: number;
  // Edited batch index
  editBatchIndex: number;
  // batches array
  batches: any[];
  newBatches: any[];
  newBatch: boolean;
  loading: boolean;
  error: string;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.loading = true;
    this.branches = [];
    this.batches = [];
    this.newBatches = [];
    this.subjects = [];
    this.newSubjects = [];
    this.newBatch = false;
    this.newSubject = false;
    this.route.params.subscribe((params: Params) => {
      // tslint:disable-next-line: no-string-literal
      this.id = params['id'];
      this.courseService.getCourseForEditing(this.id).subscribe(
        resData => {
          this.error = null;
          this.course = resData.course;
          this.branches = resData.branches;
          if (!this.course) {
            this.router.navigate(['/page_not_found'], { relativeTo: this.route });
            return;
          }
          this.batches = this.course.batch;

          // course form
          this.courseForm = new FormGroup({
            course: new FormControl(this.course.courseName, {
              validators: [Validators.required]
            }),
            courseType: new FormControl(this.course.courseType, {
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
          this.router.navigate(['/page_not_found'], { relativeTo: this.route });
        }
      );
    });
  }

  // Add Subject
  addSubject() {
    if (this.subjectForm.valid) {
      this.subErr = false;
      const subject = {
        subject: this.subjectForm.value.subject,
        fee: this.subjectForm.value.fee
      };
      this.newSubjects.push(subject);
      this.newSubject = true;
      this.resetSubjectForm();
    }
  }

  // Edit Batch
  editSubjectData(index: number) {
    this.editSubjectIndex = index;
    this.editingSubject = true;
    if (!this.newSubject) {
      this.subjectForm.patchValue({
        subject: this.subjects[index].subject,
        fee: this.subjects[index].fee
      });
    } else {
      this.subjectForm.patchValue({
        subject: this.newSubjects[index].subject,
        fee: this.newSubjects[index].fee
      });
    }
  }

  editSubject(index: number) {
    if (!this.subjectForm.valid) {
      return;
    }
    this.editSubjectIndex = null;
    this.editingSubject = false;
    if (!this.newSubject) {
      const subject: SubjectModel = {
        _id: this.subjects[index]._id,
        subject: this.subjectForm.value.subject,
        fee: this.subjectForm.value.fee
      };
      this.subjects[index] = subject;
    } else {
      const subject: any = {
        subject: this.subjectForm.value.subject,
        fee: this.subjectForm.value.fee
      };
      this.newSubjects[index] = subject;
    }
    this.resetSubjectForm();
  }

  changeSubjectType(subjectType: boolean) {
    this.newSubject = subjectType;
  }

  // Cancel Edit
  cancelEditSubject() {
    this.editSubjectIndex = null;
    this.editingSubject = false;
    this.editingSubject = false;
    this.resetSubjectForm();
  }

  // Reset Subject Form
  resetSubjectForm() {
    this.subjectForm.reset();
  }

  // Delete Subject
  deleteSubject(index: number) {
    if (this.newSubject) {
      this.newSubjects.splice(index, 1);
    } else {
      const confirm = window.confirm('Do you really want to delete This Subject??');
      if (confirm) {
        this.subjects.splice(index, 1);
      }
    }
    this.resetSubjectForm();
  }

  // Add Batch
  addBatch() {
    if (!this.batchForm.valid) {
      return;
    }

    // Subjects are not added
    if (this.newSubjects.length < 1) {
      this.subErr = true;
      return;
    }

    // Construct batch object
    const batch = {
      batchName: this.batchForm.value.batchName,
      subjects: this.newSubjects
    };

    // add batch object to array
    this.newBatches.push(batch);
    this.newBatch = true;

    this.resetBatchForm();
  }

  // Edit Batch
  editBatchData(index: number) {
    this.editBatchIndex = index;
    this.editingBatch = true;
    if (this.newBatch) {
      this.batchForm.patchValue({
        batchName: this.newBatches[index].batchName
      });
      this.newSubjects = this.newBatches[index].subjects;
      this.newSubject = true;
    } else {
      this.batchForm.patchValue({
        batchName: this.batches[index].batchName
      });
      this.subjects = [];
      this.newSubjects = [];
      this.batches[index].subjects.forEach(subject => {
        if (subject._id) {
          this.subjects.push(subject);
        } else {
          this.newSubjects.push(subject);
        }
      });
      this.newSubject = false;
    }
  }

  editBatch(index: number) {
    if (!this.batchForm.valid) {
      return;
    }

    this.editBatchIndex = null;
    this.editingBatch = false;
    if (this.newBatch) {
      const batch: any = {
        batchName: this.batchForm.value.batchName,
        subjects: this.newSubjects
      };
      this.newBatches[index] = batch;
    } else {
      this.subjects = this.subjects.concat(this.newSubjects);
      const batch: BatchModel = {
        _id: this.batches[index]._id,
        batchName: this.batchForm.value.batchName,
        subjects: this.subjects
      };
      this.batches[index] = batch;
    }

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
    this.newSubjects = [];
    this.cancelEditSubject();
  }

  deleteBatch(index: number) {
    if (this.newBatch) {
      this.newBatches.splice(index, 1);
    } else {
      const confirm = window.confirm('Do you really want to delete This Batch??');
      if (confirm) {
        this.batches.splice(index, 1);
      }
    }
    this.cancelEditBatch();
  }

  changeBatchType(batchType: boolean) {
    this.newBatch = batchType;
  }

  // Add course
  editCourse() {
    if (!this.courseForm.valid) {
      return;
    }

    this.batches = this.batches.concat(this.newBatches);

    if (this.batches.length < 1) {
      return;
    }

    const course: CourseModel = {
      _id: this.id,
      courseName: this.courseForm.value.course,
      courseType: this.courseForm.value.courseType,
      branch: this.courseForm.value.branch,
      batch: this.batches
    };

    this.courseService.editCourse(course).subscribe(
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

  onErrorClose() {
    this.error = null;
  }
}
