import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  SimpleChange,
  SimpleChanges
} from '@angular/core';

import { By } from '@angular/platform-browser';

import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';

describe('CourseCard', () => {

  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const mockCourse: Course = {
    id: '1',
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    gradeStatus: 'passed'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard]
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;

    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept course input', () => {
    expect(component.course).toEqual(mockCourse);
  });

  it('should display the course name', () => {
    const heading =
      fixture.debugElement.query(By.css('h3'));

    expect(heading).toBeTruthy();

    expect(
      heading.nativeElement.textContent.trim()
    ).toBe('Data Structures');
  });

  it('should emit course ID when button is clicked', () => {
    spyOn(component.enrollRequested, 'emit');

    const button =
      fixture.debugElement.query(By.css('button'));

    button.nativeElement.click();

    expect(
      component.enrollRequested.emit
    ).toHaveBeenCalledWith('1');
  });

  it('should log course changes in ngOnChanges', () => {
    const consoleSpy = spyOn(console, 'log');

    const newCourse: Course = {
      id: '2',
      name: 'Java Programming',
      code: 'CS102',
      credits: 3,
      gradeStatus: 'pending'
    };

    const changes: SimpleChanges = {
      course: new SimpleChange(
        mockCourse,
        newCourse,
        false
      )
    };

    component.course = newCourse;
    component.ngOnChanges(changes);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Course changed:',
      newCourse
    );
  });

});