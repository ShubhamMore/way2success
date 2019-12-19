import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentBranchComponent } from './content-branch.component';

describe('ContentBranchComponent', () => {
  let component: ContentBranchComponent;
  let fixture: ComponentFixture<ContentBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentBranchComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
