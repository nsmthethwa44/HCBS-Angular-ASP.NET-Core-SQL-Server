import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Router } from '@angular/router';
import { Preloader } from './components/preloader/preloader';
import { ScrollTop } from "./components/scroll-top/scroll-top";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Preloader, ScrollTop, ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Healthcare Appointment System';

  loading = false;
  isVisible = false;

  // constructor(private router: Router) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationStart) {
  //        this.loading = true;
  //       console.log('Loading started'); // debug
  //     }else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
  //       setTimeout(() =>{
  //         this.loading = false;
  //       }, 5000)
  //     }
  //   });
  // }

  ngOnInit(): void {
    window.onscroll = () =>{
      if(window.scrollY > 2){
        this.isVisible = true;
      }else{
        this.isVisible = false;
      }
    }
    
  }
}
