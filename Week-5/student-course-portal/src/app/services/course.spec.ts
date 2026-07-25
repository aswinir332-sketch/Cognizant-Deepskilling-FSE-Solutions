import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService', () => {

  let service: CourseService;
  let httpMock: HttpTestingController;

  const apiUrl =
    'http://localhost:3000/courses';

  const mockCourses: Course[] = [
    {
      id: '1',
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed'
    },
    {
      id: '2',
      name: 'Java Programming',
      code: 'CS102',
      credits: 3,
      gradeStatus: 'pending'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CourseService
      ]
    });

    service =
      TestBed.inject(CourseService);

    httpMock =
      TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get courses using GET request', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const request =
      httpMock.expectOne(apiUrl);

    expect(request.request.method).toBe('GET');

    request.flush(mockCourses);
  });

  it('should call the correct API URL', () => {
    service.getCourses().subscribe();

    const request =
      httpMock.expectOne(apiUrl);

    expect(request.request.url).toBe(apiUrl);

    request.flush(mockCourses);
  });

  it('should remove courses with zero credits', () => {
    const response: Course[] = [
      ...mockCourses,
      {
        id: '3',
        name: 'Invalid Course',
        code: 'CS103',
        credits: 0,
        gradeStatus: 'pending'
      }
    ];

    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);

      expect(
        courses.some(course => course.id === '3')
      ).toBeFalse();
    });

    const request =
      httpMock.expectOne(apiUrl);

    request.flush(response);
  });

  it('should return an error after retries fail', () => {
    service.getCourses().subscribe({
      next: () => {
        fail('Expected an error response');
      },

      error: error => {
        expect(error).toBeTruthy();

        expect(error.message).toBe(
          'Failed to load courses. Please try again.'
        );
      }
    });

    const errorResponse = {
      status: 500,
      statusText: 'Internal Server Error'
    };

    // First request
    const firstRequest =
      httpMock.expectOne(apiUrl);

    firstRequest.flush(
      { message: 'Server error' },
      errorResponse
    );

    // First retry
    const secondRequest =
      httpMock.expectOne(apiUrl);

    secondRequest.flush(
      { message: 'Server error' },
      errorResponse
    );

    // Second retry
    const thirdRequest =
      httpMock.expectOne(apiUrl);

    thirdRequest.flush(
      { message: 'Server error' },
      errorResponse
    );
  });

});