import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplorecourseComponent } from './explorecourse.component';

describe('ExplorecourseComponent', () => {
  let component: ExplorecourseComponent;
  let fixture: ComponentFixture<ExplorecourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExplorecourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplorecourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
