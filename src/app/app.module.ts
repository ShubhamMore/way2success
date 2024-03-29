import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { AppRoutes } from './app.routes.module';

import { LoginComponent } from './authentication/login/login.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ChangePasswordComponent } from './authentication/change-password/change-password.component';

import { ErrorComponent } from './error/error.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { Angular2ImageGalleryModule } from 'angular2-image-gallery';

import {
  AdminAuthGuard,
  LoginGuard,
  ChangePassswordGuard,
  StudentAuthGuard,
  FacultyAuthGuard
} from './authentication/auth/auth.guard';

import { RegisterComponent } from './authentication/register/register.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { CourseComponent } from './dashboard/course/course.component';
import { AddCourseComponent } from './dashboard/course/add-course/add-course.component';
import { EditCourseComponent } from './dashboard/course/edit-course/edit-course.component';
import { ShowCourseComponent } from './dashboard/course/show-course/show-course.component';

import { AboutContentComponent } from './dashboard/about/about-content/about-content.component';
import { VisionComponent } from './dashboard/about/vision/vision.component';

import { ContactComponent } from './dashboard/contact/contact.component';

import { EnquiryComponent } from './dashboard/enquiry/enquiry.component';
import { ShowEnquiryComponent } from './dashboard/enquiry/show-enquiry/show-enquiry.component';
import { ReplyEnquiryComponent } from './dashboard/enquiry/reply-enquiry/reply-enquiry.component';

import { StudentComponent } from './dashboard/student/student.component';
import { AddStudentComponent } from './dashboard/student/add-student/add-student.component';
import { ShowStudentComponent } from './dashboard/student/show-student/show-student.component';
import { EditStudentComponent } from './dashboard/student/edit-student/edit-student.component';
import { StudentAttendanceComponent } from './dashboard/student/student-attendance/student-attendance.component';
import { StudentPerformanceComponent } from './dashboard/student/student-performance/student-performance.component';
import { StudentPaymentComponent } from './dashboard/student/student-payment/student-payment.component';
import { StudentPaymentReceiptsComponent } from './dashboard/student/student-payment-receipts/student-payment-receipts.component';
// tslint:disable-next-line: max-line-length
import { ShowPaymentReceiptComponent } from './dashboard/student/student-payment-receipts/show-payment-receipt/show-payment-receipt.component';

import { MediaComponent } from './dashboard/media/media.component';
import { AddMediaComponent } from './dashboard/media/add-media/add-media.component';
import { EditMediaComponent } from './dashboard/media/edit-media/edit-media.component';
import { ShowMediaComponent } from './dashboard/media/show-media/show-media.component';
import { ShowMediaContentComponent } from './dashboard/media/show-media-content/show-media-content.component';

import { LectureComponent } from './dashboard/lecture/lecture.component';
import { AddLectureComponent } from './dashboard/lecture/add-lecture/add-lecture.component';
import { EditLectureComponent } from './dashboard/lecture/edit-lecture/edit-lecture.component';

import { LectureContentComponent } from './dashboard/lecture-content/lecture-content.component';
import { AddLectureContentComponent } from './dashboard/lecture-content/add-lecture-content/add-lecture-content.component';
import { ShowLectureContentComponent } from './dashboard/lecture-content/show-lecture-content/show-lecture-content.component';

import { AttendanceComponent } from './dashboard/attendance/attendance.component';

import { BranchComponent } from './dashboard/branch/branch.component';
import { AddBranchComponent } from './dashboard/branch/add-branch/add-branch.component';
import { EditBranchComponent } from './dashboard/branch/edit-branch/edit-branch.component';

import { ExamComponent } from './dashboard/exam/exam.component';
import { AddExamComponent } from './dashboard/exam/add-exam/add-exam.component';
import { ShowExamComponent } from './dashboard/exam/show-exam/show-exam.component';
import { EditExamComponent } from './dashboard/exam/edit-exam/edit-exam.component';

import { ImagesComponent } from './dashboard/images/images.component';
import { AddImagesComponent } from './dashboard/images/add-images/add-images.component';
import { AddImageCategoriesComponent } from './dashboard/images/add-image-categories/add-image-categories.component';

import { BudgetComponent } from './dashboard/budget/budget.component';
import { BudgetSummeryComponent } from './dashboard/budget/budget-summery/budget-summery.component';

import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { ShowStudentAttendanceComponent } from './student-dashboard/show-student-attendance/show-student-attendance.component';
import { ShowStudentPerformanceComponent } from './student-dashboard/show-student-performance/show-student-performance.component';
import { ShowStudentReceiptsComponent } from './student-dashboard/show-student-receipts/show-student-receipts.component';
import { ShowReceiptComponent } from './student-dashboard/show-student-receipts/show-receipt/show-receipt.component';
import { StudentMediaComponent } from './student-dashboard/student-media/student-media.component';
import { ShowStudentMediaComponent } from './student-dashboard/student-media/show-student-media/show-student-media.component';
import { StudentLectureComponent } from './student-dashboard/student-lecture/student-lecture.component';
import { ShowStudentLectureComponent } from './student-dashboard/student-lecture/show-student-lecture/show-student-lecture.component';
// tslint:disable-next-line: max-line-length
import { ShowStudentLectureContentComponent } from './student-dashboard/student-lecture/show-student-lecture-content/show-student-lecture-content.component';

import { TopperComponent } from './dashboard/topper/topper.component';
import { AddTopperComponent } from './dashboard/topper/add-topper/add-topper.component';
import { EditTopperComponent } from './dashboard/topper/edit-topper/edit-topper.component';

import { ContentComponent } from './content/content.component';
import { ContentAboutComponent } from './content/content-about/content-about.component';
import { ContentBranchComponent } from './content/content-branch/content-branch.component';
import { ContentContactComponent } from './content/content-contact/content-contact.component';
import { ContentPhotosComponent } from './content/content-photos/content-photos.component';

import { HttpService } from './services/http.service';
import { EncryptService } from './encrypt.service';

import { AttendanceService } from './services/attendance.service';
import { BranchService } from './services/branch.service';
import { BudgetService } from './services/budget.service';
import { ExamService } from './services/exam.service';
import { HistoryService } from './services/history.service';
import { MediaService } from './services/media.service';
import { StudentService } from './services/student.service';
import { UserService } from './services/user.service';
import { ContactService } from './services/contact.service';
import { EnquiryService } from './services/enquiry.service';
import { AboutService } from './services/about.service';
import { CourseService } from './services/course.service';
import { TopperService } from './services/topper.service';

import { Validator } from './shared/validators';

import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ShowLectureComponent } from './dashboard/lecture/show-lecture/show-lecture.component';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    FooterComponent,

    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,

    ErrorComponent,
    PageNotFoundComponent,

    DashboardComponent,

    CourseComponent,
    AddCourseComponent,
    EditCourseComponent,
    ShowCourseComponent,

    StudentComponent,
    AddStudentComponent,
    ShowStudentComponent,
    EditStudentComponent,
    StudentPerformanceComponent,
    StudentAttendanceComponent,
    StudentPaymentComponent,
    StudentPaymentReceiptsComponent,
    ShowPaymentReceiptComponent,

    BranchComponent,
    AddBranchComponent,
    EditBranchComponent,

    StudentDashboardComponent,
    ShowStudentAttendanceComponent,
    ShowStudentPerformanceComponent,
    ShowStudentReceiptsComponent,
    ShowReceiptComponent,
    StudentMediaComponent,
    ShowStudentMediaComponent,
    StudentLectureComponent,
    ShowStudentLectureComponent,
    ShowStudentLectureContentComponent,

    MediaComponent,
    AddMediaComponent,
    ShowMediaComponent,
    ShowMediaContentComponent,
    EditMediaComponent,

    LectureComponent,
    AddLectureComponent,
    EditLectureComponent,

    LectureContentComponent,
    AddLectureContentComponent,
    ShowLectureContentComponent,

    AttendanceComponent,

    ExamComponent,
    AddExamComponent,
    ShowExamComponent,
    EditExamComponent,

    ImagesComponent,
    AddImagesComponent,
    AddImageCategoriesComponent,

    BudgetComponent,
    BudgetSummeryComponent,

    TopperComponent,
    AddTopperComponent,
    EditTopperComponent,

    AboutContentComponent,
    VisionComponent,

    ContactComponent,

    EnquiryComponent,
    ShowEnquiryComponent,
    ReplyEnquiryComponent,

    ContactComponent,

    ContentComponent,
    ContentBranchComponent,
    ContentContactComponent,
    ContentAboutComponent,
    ContentPhotosComponent,

    LoadingSpinnerComponent,

    ShowLectureComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutes,
    HttpClientModule,
    PdfViewerModule,
    Angular2ImageGalleryModule
  ],
  providers: [
    HttpService,

    AttendanceService,
    BranchService,
    BudgetService,
    CourseService,
    EncryptService,
    ExamService,
    HistoryService,
    MediaService,
    StudentService,
    UserService,
    ContactService,
    EnquiryService,
    AboutService,
    TopperService,

    LoginGuard,
    AdminAuthGuard,
    StudentAuthGuard,
    FacultyAuthGuard,
    ChangePassswordGuard,

    Validator
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
