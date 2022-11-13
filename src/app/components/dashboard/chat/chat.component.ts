import { sha1 } from '@angular/compiler/src/i18n/digest';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageModel } from 'src/app/models/message.model';
import { CallApiService } from 'src/app/services/call-api.service';
import { ChatService } from 'src/app/services/chat.service';
import { HelpService } from 'src/app/services/help.service';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  public language: any;
  public message = '';
  public messages: any[] = [];
  public users: any;
  public allUsers: any;
  public searchTerm = '';
  public receiveUser!: number;
  private socket: any;

  constructor(
    private callApi: CallApiService,
    private helpService: HelpService,
    private chatService: ChatService
  ) {
    this.chatService.joinToKindergarden();
  }

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.getAllUsersForChat();
    this.chatService.checkWhenNewClientLogged();
    this.chatService.getMessage(this.messages);
  }

  getAllUsersForChat() {
    this.callApi
      .callGetMethod('/api/getAllUsersForChat', '')
      .subscribe((data) => {
        this.users = data;
        this.allUsers = this.users;
      });
  }

  sendMessage() {
    if (this.message) {
      const data = {
        kindergarden: this.helpService.getKindergardenId(),
        sender_id: this.helpService.getUserId(),
        received_id: this.receiveUser,
        message: this.message,
      };
      this.messages.push(data);
      this.message = '';
      this.chatService.sendMessage(data);
    }
  }

  search(value: string): void {
    this.users = this.allUsers.filter((val: any) =>
      val.name.toLowerCase().includes(value)
    );
  }

  selectUser(id: number) {
    this.receiveUser = id;
  }
}
