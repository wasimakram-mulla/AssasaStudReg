import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegcourseComponent } from './regcourse.component';

describe('RegcourseComponent', () => {
  let component: RegcourseComponent;
  let fixture: ComponentFixture<RegcourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegcourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegcourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
