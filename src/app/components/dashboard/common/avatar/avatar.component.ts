import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input() img!: any;
  @Input() name!: string;
  public initialeName: any;
  public initialeColor: any;

  constructor() {}

  ngOnInit(): void {
    this.onInitialize();
  }

  onInitialize() {
    this.initialeColor = this.getInitialeColor();
    if (this.name) {
      this.initialeName = this.getInitialeFromName();
    }
  }

  getInitialeFromName() {
    var splitFullName = this.name.split(' ');
    if (splitFullName.length > 1) {
      return splitFullName[0].charAt(0) + splitFullName[1].charAt(0);
    } else if (splitFullName.length == 1) {
      if (splitFullName[0].length > 1) {
        return splitFullName[0].charAt(0) + splitFullName[0].charAt(1);
      }
    }
    return '';
  }

  getInitialeColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';

    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
