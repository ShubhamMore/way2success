import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudentAttendanceComponent } from './show-student-attendance.component';

describe('ShowStudentAttendanceComponent', () => {
  let component: ShowStudentAttendanceComponent;
  let fixture: ComponentFixture<ShowStudentAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowStudentAttendanceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStudentAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
