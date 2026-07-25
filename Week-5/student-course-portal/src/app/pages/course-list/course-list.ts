import {
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Course } from '../../models/course.model';

import { CourseCard } from
  '../../components/course-card/course-card';

import {
  loadCourses
} from '../../store/course/course.actions';

import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError
} from '../../store/course/course.selectors';

import {
  enrollInCourse,
  unenrollFromCourse
} from '../../store/enrollment/enrollment.actions';

import {
  selectEnrolledIds
} from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [
    CommonModule,
    CourseCard
  ],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList implements OnInit {

  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  enrolledIds$: Observable<string[]>;

  private enrolledIds: string[] = [];

  constructor(private store: Store) {
    this.courses$ =
      this.store.select(selectAllCourses);

    this.loading$ =
      this.store.select(selectCoursesLoading);

    this.error$ =
      this.store.select(selectCoursesError);

    this.enrolledIds$ =
      this.store.select(selectEnrolledIds);

    this.enrolledIds$.subscribe(ids => {
      this.enrolledIds = ids;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadCourses());
  }

  isCourseEnrolled(
    courseId: string
  ): boolean {
    return this.enrolledIds.includes(courseId);
  }

  onEnrollRequested(
    courseId: string
  ): void {
    if (this.isCourseEnrolled(courseId)) {
      this.store.dispatch(
        unenrollFromCourse({ courseId })
      );
    } else {
      this.store.dispatch(
        enrollInCourse({ courseId })
      );
    }
  }
}