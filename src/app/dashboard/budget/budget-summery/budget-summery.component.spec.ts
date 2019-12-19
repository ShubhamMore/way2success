import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSummeryComponent } from './budget-summery.component';

describe('BudgetSummeryComponent', () => {
  let component: BudgetSummeryComponent;
  let fixture: ComponentFixture<BudgetSummeryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BudgetSummeryComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
