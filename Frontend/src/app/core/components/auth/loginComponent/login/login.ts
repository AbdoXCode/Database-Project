import { Component, inject, signal } from '@angular/core';

import { log } from 'console';
import { AuthServices } from '../../../../services/authServices/auth-services';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  _authService:AuthServices=inject(AuthServices);
  _Router:Router=inject(Router);
  loginForm: FormGroup = new FormGroup({
    id: new FormControl(null,[Validators.required]),
    phone: new FormControl(null,[Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
  });
    submitLoginForm(){
        const body ={
            id:Number(this.loginForm.value.id),
            phone:this.loginForm.value.phone
        }
        console.log(body);
        this._authService.login(body).subscribe((res)=>{
            console.log(res);
          this._authService.studentInfo.set(res);
          localStorage.setItem('studentInfo', JSON.stringify(res));
          this._Router.navigate(['/courses']);

        })
}
}
