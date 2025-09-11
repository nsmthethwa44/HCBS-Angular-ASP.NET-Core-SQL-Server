import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Copyright } from "../../components/copyright/copyright";

@Component({
  selector: 'app-footer',
  imports: [RouterLink, Copyright],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {

}
