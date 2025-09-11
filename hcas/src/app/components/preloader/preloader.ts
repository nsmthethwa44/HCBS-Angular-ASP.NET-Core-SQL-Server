import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preloader',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './preloader.html',
  styleUrl: './preloader.scss'
})
export class Preloader {
  @Input() loading: boolean = false;
}
