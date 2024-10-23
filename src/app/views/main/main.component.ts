import { Component } from '@angular/core';
import {GalleryCardComponent} from "../../shared/components/gallery-card/gallery-card.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    GalleryCardComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
