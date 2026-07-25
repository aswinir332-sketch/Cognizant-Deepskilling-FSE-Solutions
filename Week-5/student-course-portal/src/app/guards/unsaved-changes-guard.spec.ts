import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { unsavedChangesGuard } from './unsaved-changes-guard';

describe('unsavedChangesGuard', () => {

  const executeGuard = (
    component: any
  ) =>
    TestBed.runInInjectionContext(() =>
      unsavedChangesGuard(
        component,
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot,
        {} as RouterStateSnapshot
      )
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should allow navigation when component can deactivate', () => {
    const component = {
      canDeactivate: () => true
    };

    expect(executeGuard(component)).toBeTrue();
  });
});