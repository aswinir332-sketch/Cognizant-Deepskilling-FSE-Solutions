import { createReducer, on } from '@ngrx/store';

import {
  enrollInCourse,
  unenrollFromCourse,
  setEnrolledCourses
} from './enrollment.actions';

export const enrollmentFeatureKey = 'enrollment';

export interface EnrollmentState {
  enrolledCourseIds: string[];
}

export const initialEnrollmentState: EnrollmentState = {
  enrolledCourseIds: []
};

export const enrollmentReducer = createReducer(

  initialEnrollmentState,

  on(enrollInCourse, (state, { courseId }) => {

    if (state.enrolledCourseIds.includes(courseId)) {
      return state;
    }

    return {
      ...state,
      enrolledCourseIds: [
        ...state.enrolledCourseIds,
        courseId
      ]
    };

  }),

  on(unenrollFromCourse, (state, { courseId }) => ({
    ...state,
    enrolledCourseIds: state.enrolledCourseIds.filter(
      id => id !== courseId
    )
  })),

  on(setEnrolledCourses, (state, { courseIds }) => ({
    ...state,
    enrolledCourseIds: [...courseIds]
  }))

);