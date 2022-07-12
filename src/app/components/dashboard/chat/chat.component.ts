import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { HelpService } from 'src/app/services/help.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public language: any;
  public message!: string;

  constructor(private helpService: HelpService, private service: ChatService) {}

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
  }

  sendMessage() {
    this.service.sendMessage(this.message);
  }
}
