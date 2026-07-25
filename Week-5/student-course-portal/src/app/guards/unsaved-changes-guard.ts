import { CanDeactivateFn } from '@angular/router';

interface FormWithUnsavedChanges {
  enrollForm: {
    dirty: boolean;
  };
}

export const unsavedChangesGuard:
  CanDeactivateFn<FormWithUnsavedChanges> =
  (component: FormWithUnsavedChanges) => {

    if (component.enrollForm?.dirty) {
      return window.confirm(
        'You have unsaved changes. Leave?'
      );
    }

    return true;
  };