import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageCategoriesComponent } from './add-image-categories.component';

describe('AddImageCategoriesComponent', () => {
  let component: AddImageCategoriesComponent;
  let fixture: ComponentFixture<AddImageCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddImageCategoriesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
