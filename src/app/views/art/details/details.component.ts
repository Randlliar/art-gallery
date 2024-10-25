import {Component, OnInit} from '@angular/core';
import {ArtService} from "../../../shared/services/art.service";
import {ArtType} from "../../../types/art";
import {ActivatedRoute} from "@angular/router";
import {ArrayType} from "@angular/compiler";
import {NgIf, SlicePipe} from "@angular/common";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    NgIf,
    SlicePipe
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{

  art! : ArtType

  constructor(private artService: ArtService,
              private route: ActivatedRoute,
             ) {

  }

  ngOnInit() {
    this.route.params.subscribe(event => {
      this.artService.getArt(+event['id']).subscribe((item: any) => {
       if (item.data) {
         const str = item.data.artist_display.split(',');
         this.art = item.data
       }
      })
    });
  }


}
