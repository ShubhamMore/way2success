import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMediaContentComponent } from './show-media-content.component';

describe('ShowMediaContentComponent', () => {
  let component: ShowMediaContentComponent;
  let fixture: ComponentFixture<ShowMediaContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowMediaContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMediaContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
