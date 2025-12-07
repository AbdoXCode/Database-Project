import { Component, Inject, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { CoursesServices } from '../../../services/coursesServices/courses-services';
import { get } from 'http';
import { courseInterface } from '../../../interfaces/coursesInterfacet';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-courses',
  imports: [],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  _courseServices: CoursesServices = inject(CoursesServices);
  coursesInfo: WritableSignal<courseInterface[] | null> = signal(null);
  activeFilter = signal<string>('All');

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}
  currentStudentId: WritableSignal<number|null> = signal(0);
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)&& typeof localStorage !== 'undefined') {
      const studentInfo = localStorage.getItem('studentInfo') ? JSON.parse(localStorage.getItem('studentInfo')!) : null;
      this.currentStudentId.set(studentInfo ? studentInfo.Student_ID : null);
      this.getCourses(this.currentStudentId(), this.activeFilter());  
    }
    
  }


  async getCourses(StudentId: number|null = this.currentStudentId(), filter: string = this.activeFilter()) {

    console.log(StudentId,filter);
    
    this._courseServices.getCourses(StudentId!, filter).subscribe({
      next: (res) => {
        if (Array.isArray(res)) {
          this.coursesInfo.set(res);
        } else {
          this.coursesInfo.set([res]);
        }
        console.log(this.coursesInfo());
      },
      error: (err) => console.error(err),
    });
  }

  setFilter(filterName: string) {
    this.activeFilter.set(filterName);
    this.getCourses(this.currentStudentId(), filterName);
  }
  registerCourse(sectionId: number) {
    console.log(sectionId,this.currentStudentId());
    
    this._courseServices.registerCourse(this.currentStudentId()!, sectionId ).subscribe({
      next: (res) => {
        console.log(res);
        this.getCourses(this.currentStudentId(), this.activeFilter());
      }
    });
  }
  withdrawCourse(sectionId: number) {
    this._courseServices.withdrawCourse(this.currentStudentId()!, sectionId).subscribe({
      next: (res) => {
        console.log(res);
        this.getCourses(this.currentStudentId(), this.activeFilter());
      }
    });
  }


}
