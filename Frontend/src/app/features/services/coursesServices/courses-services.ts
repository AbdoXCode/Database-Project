import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../../../core/enviroment/enviroment';
import { courseInterface } from '../../interfaces/coursesInterfacet';

@Injectable({
  providedIn: 'root',
})
export class CoursesServices {
  _httpClient: HttpClient = inject(HttpClient);

  getCourses(studentId: number,filter:string): Observable<courseInterface[]> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this._httpClient.get<courseInterface[]>(
      `${Environment.baseUrl}student/${studentId}/courses?filter=${filter}`,
      { headers: headers }
    );
  }
  registerCourse(studentId: number,sectionId:number): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this._httpClient.post<any>(
      `${Environment.baseUrl}student/${studentId}/register`,{sectionId},
      { headers: headers }
    );
  }
  withdrawCourse(studentId: number,sectionId:number): Observable<any> {
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this._httpClient.post<any>(
      `${Environment.baseUrl}student/${studentId}/unregister`,{sectionId} ,{ headers: headers },
    );
  }
}