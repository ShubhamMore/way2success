import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTopperComponent } from './add-topper.component';

describe('AddTopperComponent', () => {
  let component: AddTopperComponent;
  let fixture: ComponentFixture<AddTopperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTopperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
