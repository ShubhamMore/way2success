import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTopperComponent } from './edit-topper.component';

describe('EditTopperComponent', () => {
  let component: EditTopperComponent;
  let fixture: ComponentFixture<EditTopperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTopperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
