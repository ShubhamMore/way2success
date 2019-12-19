import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudentMediaComponent } from './show-student-media.component';

describe('ShowStudentMediaComponent', () => {
  let component: ShowStudentMediaComponent;
  let fixture: ComponentFixture<ShowStudentMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowStudentMediaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStudentMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
