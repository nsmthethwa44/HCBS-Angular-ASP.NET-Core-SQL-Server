import { Component , Input} from '@angular/core';
import { SidebarLinks } from '../../constants/sidebar-links';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SidebarService } from '../../services/sidebar-service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive]
})
export class Sidebar {
  @Input() role: 'admin' | 'doctor' | 'patient' = 'patient';
   constructor(private auth: AuthService, private router: Router, private sidebarSer: SidebarService) {}

  get links() {
    return SidebarLinks[this.role] || [];
  }

logout(): void {
  this.auth.logout();
  setTimeout(() => {
     this.router.navigate(['/']);
  }, 5000); // Hide after 5s
 Swal.fire({
    icon: 'success',
    title: 'Logging Out',
    text: 'Successfully logged out.',
    timer: 1800,
    showConfirmButton: false
  });
}

closeSidebar(){
  this.sidebarSer.closeSidebar();
}

}

