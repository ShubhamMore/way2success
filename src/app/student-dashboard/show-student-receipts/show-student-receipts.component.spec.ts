import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowStudentReceiptsComponent } from './show-student-receipts.component';

describe('ShowStudentReceiptsComponent', () => {
  let component: ShowStudentReceiptsComponent;
  let fixture: ComponentFixture<ShowStudentReceiptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShowStudentReceiptsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowStudentReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
