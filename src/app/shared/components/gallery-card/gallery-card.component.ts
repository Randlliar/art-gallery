import {Component, Input, OnInit} from '@angular/core';
import {ArtService} from "../../services/art.service";
import {NgForOf, NgIf, SlicePipe} from "@angular/common";
import {ArtType} from "../../../types/art";

@Component({
  selector: 'gallery-card',
  standalone: true,
  templateUrl: './gallery-card.component.html',
  imports: [
    SlicePipe,
    NgIf,
    NgForOf
  ],
  styleUrl: './gallery-card.component.scss'
})

export class GalleryCardComponent implements OnInit {

  @Input() art!: ArtType;
  constructor() {
  }

  ngOnInit() {

  }

}
