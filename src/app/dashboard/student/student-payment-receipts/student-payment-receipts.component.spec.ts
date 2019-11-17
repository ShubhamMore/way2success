import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPaymentReceiptsComponent } from './student-payment-receipts.component';

describe('StudentPaymentReceiptsComponent', () => {
  let component: StudentPaymentReceiptsComponent;
  let fixture: ComponentFixture<StudentPaymentReceiptsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentPaymentReceiptsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentPaymentReceiptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
