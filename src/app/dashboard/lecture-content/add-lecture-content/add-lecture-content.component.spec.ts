import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLectureContentComponent } from './add-lecture-content.component';

describe('AddLectureContentComponent', () => {
  let component: AddLectureContentComponent;
  let fixture: ComponentFixture<AddLectureContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLectureContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLectureContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
