import {Component, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import { NavigationEnd, Router, RouterLink} from "@angular/router";
import {filter, Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  currentUrl!: string;
  subscription!: Subscription;
  constructor(private router: Router,
              ) {

  }
  values: string[] = [];
  ngOnInit() {
    this.currentUrl = this.router.url;
    this.subscription = this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentUrl = event.url;
    })
  }


  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
