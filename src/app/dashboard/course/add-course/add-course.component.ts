import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { Location } from '@angular/common';
import { BranchModel } from '../../../models/branch.model';
import { BranchService } from '../../../services/branch.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
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
              private branchService: BranchService,
              private location: Location) { }

  ngOnInit() {
    this.loading = true;
    this.branches = [];
    this.batches = [];
    this.subjects = [];
    this.error = null;

    this.branchService.getBranches()
    .subscribe(
      (resData: any) => {
        this.branches = resData;
        // course form
        this.courseForm = new FormGroup({
          course: new FormControl(null, {
            validators: [Validators.required]
          }),
          branch: new FormControl('', {
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
      (error: any) => {
        this.error = error;
        this.loading = false;
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
      console.log(this.batches, this.subjects);
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
    this.editBatchIndex = null;
    this.editingSubject = false;
    const subject = {
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
    this.batches.splice(index, 1);
  }

  // Edit Batch
  editBatchData(index: number) {
    this.editBatchIndex = index;
    this.editingBatch = true;
    this.batchForm.patchValue({
      batchName: this.batches[index].batchName
    });
    this.subjects = [];
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
    const batch = {
      batchName: this.batchForm.value.batchName,
      subjects: this.subjects
    };
    this.batches[index] = batch;
  }

  // Cancel Edit
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
  addCourse() {
    if (!this.courseForm.valid) {
      return;
    }

    if (this.batches.length < 1) {
      return;
    }

    this.loading = true;

    const course = {
      courseName: this.courseForm.value.course,
      branch: this.courseForm.value.branch,
      batch: this.batches
    };

    console.log(course);

    this.courseService.addCourse(course)
    .subscribe(
      resData => {
        this.error = null;
        this.courseForm.reset();
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
    this.location.back();
  }

  onErrorClose() {
    this.error = null;
  }

}
