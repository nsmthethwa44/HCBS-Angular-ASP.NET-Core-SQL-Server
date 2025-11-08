import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  isNavBarOpen = false;

  toggleNavBar() {
    this.isNavBarOpen = !this.isNavBarOpen;
  }

  closeNavbar() {
    this.isNavBarOpen = false;
  }
}
