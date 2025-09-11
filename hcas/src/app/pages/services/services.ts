import { Component } from '@angular/core';
import { Reviews } from "../../sections/reviews/reviews";
import { Cta } from "../../sections/cta/cta";

@Component({
  selector: 'app-services',
  imports: [Reviews, Cta],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {

}
