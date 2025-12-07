import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Environment } from '../../../core/enviroment/enviroment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Setting {
  _HttpClient: HttpClient=inject(HttpClient);
  updateStudentInfo(studentInfo:any,studentId:number):Observable<any>{
    const headers = new HttpHeaders({
      'ngrok-skip-browser-warning': 'true'
    });
    return this._HttpClient.put<any>(`${Environment.baseUrl}student/${studentId}`,
      studentInfo,
      { headers: headers })
  }
}
