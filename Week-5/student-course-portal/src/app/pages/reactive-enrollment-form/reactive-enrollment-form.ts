import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import { CourseService } from '../../services/course';

export function noCourseCode(
  control: AbstractControl
): ValidationErrors | null {

  const value = String(control.value ?? '').toUpperCase();

  if (value.startsWith('XX')) {
    return { noCourseCode: true };
  }

  return null;
}

export const simulateEmailCheck: AsyncValidatorFn = (
  control: AbstractControl
): Promise<ValidationErrors | null> => {

  return new Promise(resolve => {

    setTimeout(() => {

      const email = String(control.value ?? '').toLowerCase();

      if (email.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }

    }, 800);

  });
};

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css'
})
export class ReactiveEnrollmentForm implements OnInit {

  enrollForm!: FormGroup;

  submitted = false;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {

    this.enrollForm = this.fb.group({

      studentName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      studentEmail: this.fb.control(
        '',
        [
          Validators.required,
          Validators.email
        ],
        [
          simulateEmailCheck
        ]
      ),

      courseName: [
        '',
        Validators.required
      ],

      courseId: [
        '',
        [
          Validators.required,
          noCourseCode
        ]
      ],

      credits: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      preferredSemester: [
        'Odd',
        Validators.required
      ],

      agreeToTerms: [
        false,
        Validators.requiredTrue
      ],

      additionalCourses: this.fb.array([])
    });
  }

  get additionalCourses(): FormArray {
    return this.enrollForm.get(
      'additionalCourses'
    ) as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(
      new FormControl('', Validators.required)
    );
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.enrollForm.invalid) {
      this.enrollForm.markAllAsTouched();
      return;
    }

    const newCourse = {
      name: this.enrollForm.value.courseName,
      code: this.enrollForm.value.courseId,
      credits: Number(this.enrollForm.value.credits),
      gradeStatus: 'pending' as const
    };

    this.isSubmitting = true;

    this.courseService
      .createCourse(newCourse)
      .subscribe({

        next: course => {

          console.log('Created course:', course);

          this.successMessage =
            `${course.name} added successfully`;

          this.submitted = true;

          this.enrollForm.markAsPristine();
        },

        error: error => {

          console.error(
            'Course creation failed:',
            error
          );

          this.errorMessage =
            'Unable to add course. Make sure JSON Server is running.';

          this.isSubmitting = false;
        },

        complete: () => {
          this.isSubmitting = false;
        }
      });
  }

  resetForm(): void {

    this.enrollForm.reset({
      studentName: '',
      studentEmail: '',
      courseName: '',
      courseId: '',
      credits: '',
      preferredSemester: 'Odd',
      agreeToTerms: false
    });

    this.additionalCourses.clear();

    this.submitted = false;
    this.successMessage = '';
    this.errorMessage = '';
  }
}