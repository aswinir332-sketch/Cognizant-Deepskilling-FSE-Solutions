import {
  ApplicationConfig,
  provideZonelessChangeDetection
} from '@angular/core';

import { provideRouter } from '@angular/router';

import {
  provideHttpClient,
  withFetch
} from '@angular/common/http';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';

import {
  courseFeatureKey,
  courseReducer
} from './store/course/course.reducer';

import {
  enrollmentFeatureKey,
  enrollmentReducer
} from './store/enrollment/enrollment.reducer';

import { CourseEffects } from './store/course/course.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),

    provideHttpClient(withFetch()),

    provideStore({
      [courseFeatureKey]: courseReducer,
      [enrollmentFeatureKey]: enrollmentReducer
    }),

    provideEffects([CourseEffects])
  ]
};