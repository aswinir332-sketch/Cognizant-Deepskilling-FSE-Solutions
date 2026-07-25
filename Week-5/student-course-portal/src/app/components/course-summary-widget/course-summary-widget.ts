import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css'
})
export class CourseSummaryWidget implements OnInit {

  courseCount = 0;
  loading = false;
  errorMessage = '';

  constructor(
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadCourseCount();
  }

  loadCourseCount(): void {

    this.loading = true;
    this.errorMessage = '';

    this.courseService.getCourses()
      .subscribe({

        next: courses => {
          this.courseCount = courses.length;
        },

        error: error => {

          console.error(error);

          this.errorMessage =
            'Unable to load course count';

          this.loading = false;
        },

        complete: () => {
          this.loading = false;
        }
      });
  }

  addSampleCourse(): void {

    const newCourse: Omit<Course, 'id'> = {
      name: 'Spring Boot',
      code: 'CS401',
      credits: 4,
      gradeStatus: 'pending'
    };

    this.courseService.createCourse(newCourse)
      .subscribe({

        next: course => {

          console.log(
            'Course created:',
            course
          );

          this.loadCourseCount();
        },

        error: error => {
          console.error(
            'Unable to create course:',
            error
          );
        }
      });
  }
}