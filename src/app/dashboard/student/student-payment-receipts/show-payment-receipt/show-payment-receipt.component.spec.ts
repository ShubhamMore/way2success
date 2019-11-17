import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPaymentReceiptComponent } from './show-payment-receipt.component';

describe('ShowPaymentReceiptComponent', () => {
  let component: ShowPaymentReceiptComponent;
  let fixture: ComponentFixture<ShowPaymentReceiptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPaymentReceiptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPaymentReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
