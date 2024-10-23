import {Component, OnInit} from '@angular/core';
import {ArtService} from "../../../shared/services/art.service";
import {ArtType} from "../../../types/art";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

  item: ArtType[] = []
  constructor(private artService: ArtService) {

  }

  ngOnInit() {
    this.artService.getArt(222704)
      .subscribe((item: any) => {

        this.item = item.data;
      })
  }


}
