import {Component, OnInit} from '@angular/core';
import {ArtService} from "../../services/art.service";

@Component({
  selector: 'gallery-card',
  standalone: true,
  templateUrl: './gallery-card.component.html',
  styleUrl: './gallery-card.component.scss'
})

export class GalleryCardComponent implements OnInit {

  constructor(private artService: ArtService) {
  }

  ngOnInit() {

  }

}
