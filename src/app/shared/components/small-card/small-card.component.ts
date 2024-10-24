import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ArtService} from "../../services/art.service";
import {NgForOf, NgIf, SlicePipe,} from "@angular/common";
import {ArtType} from "../../../types/art";

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

  @Input() art!: ArtType

  constructor(private artService: ArtService) {
  }

  ngOnInit() {

  }

}
