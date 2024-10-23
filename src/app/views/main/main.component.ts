import { Component } from '@angular/core';
import {GalleryCardComponent} from "../../shared/components/gallery-card/gallery-card.component";
import {SmallCardComponent} from "../../shared/components/small-card/small-card.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    GalleryCardComponent,
    SmallCardComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
