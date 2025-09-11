import { Component } from '@angular/core';
import { Reviews } from "../../sections/reviews/reviews";
import { Cta } from "../../sections/cta/cta";

@Component({
  selector: 'app-blog',
  imports: [Reviews, Cta],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class Blog {

}
