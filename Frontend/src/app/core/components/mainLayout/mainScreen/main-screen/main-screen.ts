import { Component } from '@angular/core';
import { Navbar } from "../../navbar/navbar/navbar";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-screen',
  imports: [Navbar,RouterOutlet],
  templateUrl: './main-screen.html',
  styleUrl: './main-screen.css',
})
export class MainScreen {

}
