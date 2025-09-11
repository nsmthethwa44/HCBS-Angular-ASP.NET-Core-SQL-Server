import { Component } from '@angular/core';
import { AboutSection } from "../../sections/about-section/about-section";
import { Reviews } from "../../sections/reviews/reviews";
import { Cta } from "../../sections/cta/cta";

@Component({
  selector: 'app-about',
  imports: [AboutSection, Reviews, Cta],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

}
