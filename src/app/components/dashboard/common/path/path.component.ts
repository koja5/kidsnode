import { Component, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss'],
})
export class PathComponent implements OnInit {
  // @Input() node?: string;
  public path?: any[];
  public node?: string;

  constructor(private router: Router) {
    this.path = this.router.url.split('/');
    this.node = this.path[this.path.length - 1];
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log(event.url);
        this.path = event.url.split('/');
        this.node = this.path[this.path.length - 1];
      }
    });
  }

  upperFirstCase(item: string) {
    return item.charAt(0).toUpperCase() + item.slice(1);
  }
}
