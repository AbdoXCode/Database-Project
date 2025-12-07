import { studentInfo } from './../../../../interface/authInterface';
import { Component,PLATFORM_ID, Inject,inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../../../services/authServices/auth-services';
import { isPlatformBrowser } from '@angular/common';
import { FlowbiteService } from '../../../../services/flowbite/flowbite';
import { initFlowbite } from 'flowbite';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  _authService:AuthServices=inject(AuthServices);
  studentInfo:WritableSignal<studentInfo|null>=signal( null);
  constructor(@Inject(PLATFORM_ID) private platformId: any, private flowbiteService: FlowbiteService){}
  _Router:Router=inject(Router)
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    if (isPlatformBrowser(this.platformId)&& typeof localStorage !== 'undefined') {
      this.studentInfo.set(localStorage.getItem('studentInfo') ? JSON.parse(localStorage.getItem('studentInfo')!): null); ;
    }
    
  }
  logout(){
    localStorage.removeItem('studentInfo');
    this._authService.studentInfo.set(null);
    this._Router.navigate(['/login']);
  }


}
