import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Environment } from '../../enviroment/enviroment';
import { studentInfo } from '../../interface/authInterface';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  _httpClient:HttpClient=inject(HttpClient);
  studentInfo:WritableSignal<studentInfo|null>=signal(null);

  login(body:any):Observable<any> {
    return this._httpClient.post(`${Environment.baseUrl}login`,body)
  }
  signUp(body:any):Observable<any> {
   return this._httpClient.post(`${Environment.baseUrl}signup`,body)
  }
}
