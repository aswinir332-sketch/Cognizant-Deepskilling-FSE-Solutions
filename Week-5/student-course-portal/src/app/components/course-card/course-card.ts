import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css'
})
export class CourseCard implements OnChanges {

  @Input({ required: true })
  course!: Course;

  @Input()
  isEnrolled = false;

  @Output()
  enrollRequested = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log(
        'Course changed:',
        changes['course'].currentValue
      );
    }
  }

  requestEnrollment(): void {
    this.enrollRequested.emit(this.course.id);
  }
}