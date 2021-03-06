import {Component, OnInit} from '@angular/core';
import {Course, sortCoursesBySeqNo} from '../model/course';
import {interval, noop, Observable, of, throwError, timer} from 'rxjs';
import {catchError, delay, delayWhen, filter, finalize, map, retryWhen, shareReplay, tap} from 'rxjs/operators';
import { CoursesStore } from "../services/courses.store";

// import { CoursesService } from "../services/courses.service";
import { LoadingService } from 'app/loading/loading.service';
import { MessageService } from 'app/messages/messages.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  beginnerCourses$: Observable<Course[]>;

  advancedCourses$: Observable<Course[]>;


  constructor(
              // private coursesService: CoursesService,
              private loadingService: LoadingService, 
              private messageService: MessageService,
              private courseStore: CoursesStore
              ) {

  }

  ngOnInit() {

  this.reloadCourses()

  }

  
  reloadCourses() {
    // const courses$ = this.coursesService.loadAllCourses().pipe(
    //   map(courses => courses.sort(sortCoursesBySeqNo)),
    //   catchError(err => {
    //     const errorMessage = 'Could Not Load Courses'
    //     this.messageService.showErrors(errorMessage)
    //     console.log(errorMessage)
    //     return throwError(err)
    //   })
    // )

    // const loadCourses$ = this.loadingService.showLoaderUntilCompleted(courses$)
    // this.beginnerCourses$ = loadCourses$.pipe(map(courses => courses.filter(course => course.category == "BEGINNER")))
    // this.advancedCourses$ = loadCourses$.pipe(map(courses => courses.filter(course => course.category == "ADVANCED")))

    this.beginnerCourses$ = this.courseStore.filterByCategory("BEGINNER")
    this.advancedCourses$ = this.courseStore.filterByCategory("ADVANCED")


  }

}




