import { Component } from '@angular/core';
import { Sidebar } from '../../components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { Copyright } from "../../components/copyright/copyright";
import { SidebarService } from '../../services/sidebar-service';

@Component({
  selector: 'app-admin-component',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Copyright],
  templateUrl: './admin-component.html',
  styleUrl: './admin-component.scss'
})
export class AdminComponent {
  constructor( private sidebarSer: SidebarService){}

     toggleSidebar(){
    this.sidebarSer.toggleSidebar();
  }
}
