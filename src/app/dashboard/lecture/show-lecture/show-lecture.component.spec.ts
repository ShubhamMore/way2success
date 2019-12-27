import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLectureComponent } from './show-lecture.component';

describe('ShowLectureComponent', () => {
  let component: ShowLectureComponent;
  let fixture: ComponentFixture<ShowLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
