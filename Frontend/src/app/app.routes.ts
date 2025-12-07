import { Routes } from '@angular/router';
import { Login } from './core/components/auth/loginComponent/login/login';
import { MainScreen } from './core/components/mainLayout/mainScreen/main-screen/main-screen';
import { AuthLayout } from './core/components/auth/authLayout/auth-layout/auth-layout';
import { SignUp } from './core/components/auth/signUpComponent/sign-up/sign-up';
import { HomePage } from './features/components/homePage/home-page/home-page';
import { Courses } from './features/components/courses/courses/courses';
import { UpdateStudentInfo } from './features/components/updateStudentInfo/update-student-info/update-student-info';

export const routes: Routes = [
    {path: '',redirectTo: 'login',pathMatch: 'full'}, 
    {path :"",component:AuthLayout, children:[
        {path: 'login',component:Login,title:'Login Page'},
        {path:"signUp",component:SignUp,title:'Sign Up Page'}
    ]},
    {path :"",component:MainScreen, children:[
        {path:"courses", component:Courses, title:'Courses Page'},
        {path:"settings",component:UpdateStudentInfo, title:'Update Student Info Page'}
    ]},
    {path: '**', redirectTo: 'login' ,pathMatch: 'full'}
];
