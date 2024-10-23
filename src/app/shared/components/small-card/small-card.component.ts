import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArtService} from "../../services/art.service";
import {NgForOf, NgIf, SlicePipe,} from "@angular/common";

@Component({
  selector: 'small-card',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SlicePipe,
  ],
  templateUrl: './small-card.component.html',
  styleUrl: './small-card.component.scss'
})
export class SmallCardComponent implements OnInit{

  data: any = [];
  constructor(private artService: ArtService) {
  }

  ngOnInit() {
    this.artService.getArts(1, 9)
      .pipe()
      .subscribe((data: any) => {
        console.log(data.data)
        this.data = data.data;
      })

  }

}
