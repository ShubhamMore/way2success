import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AdminAuthGuard,
  LoginGuard,
  ChangePassswordGuard,
  StudentAuthGuard
} from './authentication/auth/auth.guard';

import { RegisterComponent } from './authentication/register/register.component';
import { LoginComponent } from './authentication/login/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ChangePasswordComponent } from './authentication/change-password/change-password.component';

import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';

import { ContentComponent } from './content/content.component';
import { ContentBranchComponent } from './content/content-branch/content-branch.component';
import { ContentAboutComponent } from './content/content-about/content-about.component';
import { ContentContactComponent } from './content/content-contact/content-contact.component';
import { ContentPhotosComponent } from './content/content-photos/content-photos.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { CourseComponent } from './dashboard/course/course.component';
import { AddCourseComponent } from './dashboard/course/add-course/add-course.component';
import { ShowCourseComponent } from './dashboard/course/show-course/show-course.component';
import { EditCourseComponent } from './dashboard/course/edit-course/edit-course.component';

import { StudentComponent } from './dashboard/student/student.component';
import { AddStudentComponent } from './dashboard/student/add-student/add-student.component';
import { ShowStudentComponent } from './dashboard/student/show-student/show-student.component';
import { EditStudentComponent } from './dashboard/student/edit-student/edit-student.component';
import { StudentAttendanceComponent } from './dashboard/student/student-attendance/student-attendance.component';
import { StudentPerformanceComponent } from './dashboard/student/student-performance/student-performance.component';
import { StudentHistoryComponent } from './dashboard/student/student-history/student-history.component';
import { StudentPaymentComponent } from './dashboard/student/student-payment/student-payment.component';
import { StudentPaymentReceiptsComponent } from './dashboard/student/student-payment-receipts/student-payment-receipts.component';
// tslint:disable-next-line: max-line-length
import { ShowPaymentReceiptComponent } from './dashboard/student/student-payment-receipts/show-payment-receipt/show-payment-receipt.component';
import { StudentLectureComponent } from './student-dashboard/student-lecture/student-lecture.component';
import { ShowStudentLectureComponent } from './student-dashboard/student-lecture/show-student-lecture/show-student-lecture.component';
// tslint:disable-next-line: max-line-length
import { ShowStudentLectureContentComponent } from './student-dashboard/student-lecture/show-student-lecture-content/show-student-lecture-content.component';

import { MediaComponent } from './dashboard/media/media.component';
import { AddMediaComponent } from './dashboard/media/add-media/add-media.component';
import { ShowMediaComponent } from './dashboard/media/show-media/show-media.component';
import { ShowMediaContentComponent } from './dashboard/media/show-media-content/show-media-content.component';
import { EditMediaComponent } from './dashboard/media/edit-media/edit-media.component';

import { LectureComponent } from './dashboard/lecture/lecture.component';
import { AddLectureComponent } from './dashboard/lecture/add-lecture/add-lecture.component';
import { EditLectureComponent } from './dashboard/lecture/edit-lecture/edit-lecture.component';
import { ShowLectureComponent } from './dashboard/lecture/show-lecture/show-lecture.component';

import { LectureContentComponent } from './dashboard/lecture-content/lecture-content.component';
import { AddLectureContentComponent } from './dashboard/lecture-content/add-lecture-content/add-lecture-content.component';
import { ShowLectureContentComponent } from './dashboard/lecture-content/show-lecture-content/show-lecture-content.component';

import { AttendanceComponent } from './dashboard/attendance/attendance.component';

import { BranchComponent } from './dashboard/branch/branch.component';
import { AddBranchComponent } from './dashboard/branch/add-branch/add-branch.component';
import { EditBranchComponent } from './dashboard/branch/edit-branch/edit-branch.component';

import { AddExamComponent } from './dashboard/exam/add-exam/add-exam.component';
import { ExamComponent } from './dashboard/exam/exam.component';
import { ShowExamComponent } from './dashboard/exam/show-exam/show-exam.component';
import { EditExamComponent } from './dashboard/exam/edit-exam/edit-exam.component';

import { BudgetComponent } from './dashboard/budget/budget.component';
import { BudgetSummeryComponent } from './dashboard/budget/budget-summery/budget-summery.component';

import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ShowStudentAttendanceComponent } from './student-dashboard/show-student-attendance/show-student-attendance.component';
import { ShowStudentPerformanceComponent } from './student-dashboard/show-student-performance/show-student-performance.component';
import { ShowStudentReceiptsComponent } from './student-dashboard/show-student-receipts/show-student-receipts.component';
import { ShowReceiptComponent } from './student-dashboard/show-student-receipts/show-receipt/show-receipt.component';
import { StudentMediaComponent } from './student-dashboard/student-media/student-media.component';
import { ShowStudentMediaComponent } from './student-dashboard/student-media/show-student-media/show-student-media.component';

import { AimComponent } from './dashboard/about/aim/aim.component';
import { MissionComponent } from './dashboard/about/mission/mission.component';
import { VisionComponent } from './dashboard/about/vision/vision.component';

import { ContactComponent } from './dashboard/contact/contact.component';

import { EnquiryComponent } from './dashboard/enquiry/enquiry.component';
import { ShowEnquiryComponent } from './dashboard/enquiry/show-enquiry/show-enquiry.component';
import { ReplyEnquiryComponent } from './dashboard/enquiry/reply-enquiry/reply-enquiry.component';

import { TopperComponent } from './dashboard/topper/topper.component';
import { AddTopperComponent } from './dashboard/topper/add-topper/add-topper.component';
import { EditTopperComponent } from './dashboard/topper/edit-topper/edit-topper.component';

import { ImagesComponent } from './dashboard/images/images.component';
import { AddImagesComponent } from './dashboard/images/add-images/add-images.component';
import { AddImageCategoriesComponent } from './dashboard/images/add-image-categories/add-image-categories.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: ContentComponent, canActivate: [LoginGuard] },
  {
    path: 'branch',
    component: ContentBranchComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'about',
    component: ContentAboutComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'contact',
    component: ContentContactComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'photos',
    component: ContentPhotosComponent,
    canActivate: [LoginGuard]
  },

  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    canActivate: [LoginGuard]
  },

  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AdminAuthGuard]
  },

  { path: 'admin/aim', component: AimComponent, canActivate: [AdminAuthGuard] },
  {
    path: 'admin/mission',
    component: MissionComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/vision',
    component: VisionComponent,
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'admin/attendance',
    component: AttendanceComponent,
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'admin/branch',
    component: BranchComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/branch/new',
    component: AddBranchComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/branch/:id/edit',
    component: EditBranchComponent,
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'admin/contact',
    component: ContactComponent,
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'admin/topper',
    component: TopperComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/topper/new',
    component: AddTopperComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/topper/:id/edit',
    component: EditTopperComponent,
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'admin/enquiry',
    component: EnquiryComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/enquiry/:id',
    component: ShowEnquiryComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/enquiry/:id/reply',
    component: ReplyEnquiryComponent,
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'admin/student',
    component: StudentComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/student/new',
    component: AddStudentComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/student/:id',
    component: ShowStudentComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/student/:id/edit',
    component: EditStudentComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/student/:id/attendance',
    component: StudentAttendanceComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/student/:id/performance',
    component: StudentPerformanceComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/student/:id/history',
    component: StudentHistoryComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/student/:id/payment',
    component: StudentPaymentComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/student/:id/receipt',
    component: StudentPaymentReceiptsComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/student/:id/receipt/:receiptid',
    component: ShowPaymentReceiptComponent,
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'admin/course',
    component: CourseComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/course/new',
    component: AddCourseComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/course/:id',
    component: ShowCourseComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/course/:id/edit',
    component: EditCourseComponent,
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'admin/media',
    component: MediaComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/media/new',
    component: AddMediaComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/media/:id/show',
    component: ShowMediaContentComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/media/:id/edit',
    component: EditMediaComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/media/:id',
    component: ShowMediaComponent,
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'admin/lecture',
    component: LectureComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/lecture/new',
    component: AddLectureComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/lecture/:id/edit',
    component: EditLectureComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/lecture/:id/show',
    component: ShowLectureComponent,
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'admin/lecture/:id/content',
    component: LectureContentComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/lecture/:id/content/add',
    component: AddLectureContentComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/lecture/:id/content/:content',
    component: ShowLectureContentComponent,
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'admin/exam',
    component: ExamComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/exam/new',
    component: AddExamComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/exam/:id',
    component: ShowExamComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/exam/:id/edit',
    component: EditExamComponent,
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'admin/image',
    component: ImagesComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/image/new',
    component: AddImagesComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/image/category',
    component: AddImageCategoriesComponent,
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'admin/budget',
    component: BudgetComponent,
    canActivate: [AdminAuthGuard]
  },
  {
    path: 'admin/budget/summery',
    component: BudgetSummeryComponent,
    canActivate: [AdminAuthGuard]
  },

  {
    path: 'student/:id',
    component: StudentDashboardComponent,
    canActivate: [StudentAuthGuard]
  },
  {
    path: 'student/:id/attendance',
    component: ShowStudentAttendanceComponent,
    canActivate: [StudentAuthGuard]
  },
  {
    path: 'student/:id/performance',
    component: ShowStudentPerformanceComponent,
    canActivate: [StudentAuthGuard]
  },
  {
    path: 'student/:id/receipt',
    component: ShowStudentReceiptsComponent,
    canActivate: [StudentAuthGuard]
  },
  {
    path: 'student/:id/receipt/:receiptid',
    component: ShowReceiptComponent,
    canActivate: [StudentAuthGuard]
  },
  {
    path: 'student/:id/media',
    component: StudentMediaComponent,
    canActivate: [StudentAuthGuard]
  },
  {
    path: 'student/:id/media/:mediaid',
    component: ShowStudentMediaComponent,
    canActivate: [StudentAuthGuard]
  },

  {
    path: 'student/:id/lecture',
    component: StudentLectureComponent,
    canActivate: [StudentAuthGuard]
  },
  {
    path: 'student/:id/lecture/:lectureid',
    component: ShowStudentLectureComponent,
    canActivate: [StudentAuthGuard]
  },
  {
    path: 'student/:id/lecture/:lectureid/:contentid',
    component: ShowStudentLectureContentComponent,
    canActivate: [StudentAuthGuard]
  },

  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    canActivate: [ChangePassswordGuard]
  },

  { path: 'page_not_found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page_not_found' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutes {}
