import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-children',
  templateUrl: './profile-children.component.html',
  styleUrls: ['./profile-children.component.scss']
})
export class ProfileChildrenComponent implements OnInit {

  public path = '/tabs/children';
  public file = 'profile-children.json';

  constructor() { }

  ngOnInit(): void {
  }

}
