import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMediaComponent } from './student-media.component';

describe('StudentMediaComponent', () => {
  let component: StudentMediaComponent;
  let fixture: ComponentFixture<StudentMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
