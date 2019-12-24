import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudentLectureComponent } from './show-student-lecture.component';

describe('ShowStudentLectureComponent', () => {
  let component: ShowStudentLectureComponent;
  let fixture: ComponentFixture<ShowStudentLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStudentLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStudentLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
