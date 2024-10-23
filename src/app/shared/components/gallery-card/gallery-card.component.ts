import {Component, OnInit} from '@angular/core';
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

  items: ArtType[] = [];
  id: number = 0;
  constructor(private artService: ArtService) {
  }

  ngOnInit() {
    this.artService.getArts(1, 3)
      .subscribe((item: any) => {
        this.id = item.data.filter((id: any) => id.id);
        console.log(this.id)
        this.items = item.data;

      })
  }

}
