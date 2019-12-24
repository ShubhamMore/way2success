import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudentLectureContentComponent } from './show-student-lecture-content.component';

describe('ShowStudentLectureContentComponent', () => {
  let component: ShowStudentLectureContentComponent;
  let fixture: ComponentFixture<ShowStudentLectureContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowStudentLectureContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStudentLectureContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
