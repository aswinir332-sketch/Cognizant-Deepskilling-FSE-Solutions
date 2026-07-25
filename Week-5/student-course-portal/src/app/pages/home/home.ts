import { Component, OnInit } from '@angular/core';

import { CourseService } from '../../services/course';
import { CourseSummaryWidget } from '../../components/course-summary-widget/course-summary-widget';
import { Notification } from '../../components/notification/notification';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CourseSummaryWidget,
    Notification
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  courseCount = 0;

  constructor(
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.updateCourseCount();
  }

  updateCourseCount(): void {

    this.courseService.getCourses().subscribe({

      next: (courses) => {
        this.courseCount = courses.length;
      },

      error: (error) => {
        console.error(
          'Error loading courses:',
          error
        );
      }

    });
  }
}