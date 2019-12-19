import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudentPerformanceComponent } from './show-student-performance.component';

describe('ShowStudentPerformanceComponent', () => {
  let component: ShowStudentPerformanceComponent;
  let fixture: ComponentFixture<ShowStudentPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowStudentPerformanceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStudentPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
