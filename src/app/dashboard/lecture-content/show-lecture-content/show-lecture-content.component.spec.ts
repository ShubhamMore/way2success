import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLectureContentComponent } from './show-lecture-content.component';

describe('ShowLectureContentComponent', () => {
  let component: ShowLectureContentComponent;
  let fixture: ComponentFixture<ShowLectureContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLectureContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLectureContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
