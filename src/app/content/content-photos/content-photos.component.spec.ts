import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPhotosComponent } from './content-photos.component';

describe('ContentPhotosComponent', () => {
  let component: ContentPhotosComponent;
  let fixture: ComponentFixture<ContentPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentPhotosComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
