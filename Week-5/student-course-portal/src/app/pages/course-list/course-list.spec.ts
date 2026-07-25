import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import {
  MockStore,
  provideMockStore
} from '@ngrx/store/testing';

import { CourseList } from './course-list';
import { Course } from '../../models/course.model';

import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError
} from '../../store/course/course.selectors';

import {
  selectEnrolledIds
} from '../../store/enrollment/enrollment.selectors';

import {
  loadCourses
} from '../../store/course/course.actions';

import {
  enrollInCourse
} from '../../store/enrollment/enrollment.actions';

describe('CourseList', () => {

  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const mockCourses: Course[] = [
    {
      id: '1',
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed'
    },
    {
      id: '2',
      name: 'Java Programming',
      code: 'CS102',
      credits: 3,
      gradeStatus: 'pending'
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CourseList
      ],

      providers: [
        provideMockStore()
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);

    store.overrideSelector(
      selectAllCourses,
      mockCourses
    );

    store.overrideSelector(
      selectCoursesLoading,
      false
    );

    store.overrideSelector(
      selectCoursesError,
      null
    );

    store.overrideSelector(
      selectEnrolledIds,
      []
    );

    fixture =
      TestBed.createComponent(CourseList);

    component =
      fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadCourses', () => {
    const dispatchSpy =
      spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(dispatchSpy)
      .toHaveBeenCalledWith(loadCourses());
  });

  it('should render two course cards', () => {
    fixture.detectChanges();

    const cards =
      fixture.debugElement.queryAll(
        By.css('app-course-card')
      );

    expect(cards.length).toBe(2);
  });

  it('should render course names', () => {
    fixture.detectChanges();

    const headings =
      fixture.debugElement.queryAll(
        By.css('h3')
      );

    expect(headings.length).toBe(2);

    expect(
      headings[0].nativeElement.textContent
    ).toContain('Data Structures');

    expect(
      headings[1].nativeElement.textContent
    ).toContain('Java Programming');
  });

  it('should display loading message', () => {
    const loadingSelector =
      store.overrideSelector(
        selectCoursesLoading,
        true
      );

    const coursesSelector =
      store.overrideSelector(
        selectAllCourses,
        []
      );

    loadingSelector.setResult(true);
    coursesSelector.setResult([]);

    store.refreshState();
    fixture.detectChanges();

    const loadingElement =
      fixture.debugElement.query(
        By.css('.loading-message')
      );

    expect(loadingElement).toBeTruthy();

    expect(
      loadingElement.nativeElement.textContent
    ).toContain('Loading courses...');
  });

  it('should dispatch enroll action', () => {
    const dispatchSpy =
      spyOn(store, 'dispatch');

    component.onEnrollRequested('1');

    expect(dispatchSpy)
      .toHaveBeenCalledWith(
        enrollInCourse({
          courseId: '1'
        })
      );
  });

});