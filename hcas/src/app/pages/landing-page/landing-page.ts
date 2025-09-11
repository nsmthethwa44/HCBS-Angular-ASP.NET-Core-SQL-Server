import { Component } from '@angular/core';
import { Hero } from "../../sections/hero/hero";
import { Steps } from '../../sections/steps/steps';
import { Marquee } from "../../sections/marquee/marquee";
import { Services } from "../../sections/services/services";
import { WhyChooseUs } from '../../sections/why-choose-us/why-choose-us';
import { Team } from "../../sections/team/team";
import { Reviews } from "../../sections/reviews/reviews";
import { Clients } from "../../sections/clients/clients";
import { Blog } from "../../sections/blog/blog";
import { Cta } from "../../sections/cta/cta";
import { AboutSection } from "../../sections/about-section/about-section";

@Component({
  selector: 'app-landing-page',
  imports: [Hero, Steps, Marquee, Services, WhyChooseUs, Team, Reviews, Clients, Blog, Cta, AboutSection],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {

}
