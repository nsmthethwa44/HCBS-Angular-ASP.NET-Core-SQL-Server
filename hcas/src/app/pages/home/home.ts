import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import {  RouterOutlet } from '@angular/router';
import { Footer } from "../../sections/footer/footer";

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
