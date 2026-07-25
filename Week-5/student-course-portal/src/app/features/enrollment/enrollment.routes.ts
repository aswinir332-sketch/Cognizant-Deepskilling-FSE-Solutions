import { Routes } from '@angular/router';

import { ReactiveEnrollmentForm } from
  '../../pages/reactive-enrollment-form/reactive-enrollment-form';

import { unsavedChangesGuard } from
  '../../guards/unsaved-changes-guard';

export const ENROLLMENT_ROUTES: Routes = [
  {
    path: '',
    component: ReactiveEnrollmentForm,
    canDeactivate: [unsavedChangesGuard]
  }
];