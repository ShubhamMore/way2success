import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyEnquiryComponent } from './reply-enquiry.component';

describe('ReplyEnquiryComponent', () => {
  let component: ReplyEnquiryComponent;
  let fixture: ComponentFixture<ReplyEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplyEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplyEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
