import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLectureComponent } from './student-lecture.component';

describe('StudentLectureComponent', () => {
  let component: StudentLectureComponent;
  let fixture: ComponentFixture<StudentLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
