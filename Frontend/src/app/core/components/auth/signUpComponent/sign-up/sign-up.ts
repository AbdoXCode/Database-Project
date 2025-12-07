import { Component, inject } from '@angular/core';
import { AuthServices } from '../../../../services/authServices/auth-services';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  _authService:AuthServices=inject(AuthServices)
  _Router:Router=inject(Router)

    signUpFrom:FormGroup = new FormGroup({
      First_Name: new FormControl(null, [Validators.required]),
      Last_Name: new FormControl(null, [Validators.required]),
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Phone: new FormControl(null, [Validators.required]),
      Date_Of_Birth: new FormControl(null, [Validators.required]),
      Year_Level: new FormControl(null, [Validators.required]),
      Dept_ID: new FormControl(null, [Validators.required]),
    })


    submitSignUpForm() {

      if (this.signUpFrom.valid) {

        this._authService.signUp(this.signUpFrom.value).subscribe((res) => {
          console.log(res);
          this._authService.studentInfo.set(res);
          localStorage.setItem('studentInfo', JSON.stringify(res));
          this._Router.navigate(['/courses']);
        })
      }

    }


}
