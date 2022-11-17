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
  public newMessages: any[] = [];
  public users: any;
  public allUsers: any;
  public searchTerm = '';
  public receiveUser: any;
  public loader = false;
  public newMessageNotification: any = {};
  public kindergardenId: any;

  constructor(
    private callApi: CallApiService,
    public helpService: HelpService,
    private chatService: ChatService
  ) {
    this.chatService.joinToKindergarden();
  }

  ngOnInit(): void {
    this.language = this.helpService.getLanguage();
    this.getAllUsersForChat();
    this.chatService.checkWhenNewClientLogged();
    this.chatService.getMessage(this.messages);
    this.chatService.getNewMessageNotification(this.newMessageNotification);
    this.getInfoAboutUnreadMessage();
    this.kindergardenId = this.helpService.getKindergardenId();
  }

  ngOnDestroy(): void {}

  getInfoAboutUnreadMessage() {
    const unreadMessage =
      this.helpService.getSessionStorage('new_unread_message');
    for (let i = 0; i < unreadMessage.length; i++) {
      this.newMessageNotification[unreadMessage[i]] = true;
    }
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
        received_id: this.receiveUser.id,
        message: this.message,
      };
      this.messages.push(data);
      this.newMessages.push(data);
      this.message = '';
      this.chatService.sendMessage(data);
      this.chatService.addMessage(data).subscribe((data) => {});
      this.autoScroll();
    }
  }

  search(value: string): void {
    this.users = this.allUsers.filter((val: any) =>
      val.name.toLowerCase().includes(value)
    );
  }

  selectUser(item: any) {
    this.loader = true;
    this.receiveUser = item;
    this.chatService.getMessages(item.id.toString()).subscribe((data: any) => {
      console.log(data);
      this.messages = data;
      this.chatService.getMessage(this.messages);
      this.loader = false;
    });
    if (this.newMessageNotification[item.id]) {
      delete this.newMessageNotification[item.id];
      this.helpService.setSessionStorage(
        'new_unread_message',
        this.newMessageNotification
      );
    }
  }

  autoScroll() {
    var elem = document.getElementById('messages');
    var atbottom = this.scrollAtBottom(elem);
    var isWebkit = 'WebkitAppearance' in document.documentElement.style;
    var isEdge = '-ms-accelerator' in document.documentElement.style;
    var tempCounter = 6;
    if (atbottom) {
      this.updateScroll(elem);
    }
  }

  updateScroll(el: any) {
    setTimeout(() => {
      var elem = document.getElementById('messages');
      if (elem) {
        elem.scrollTop = elem.scrollHeight + 20;
      }
    }, 20);
  }
  scrollAtBottom(el: any) {
    if (el) {
      return el.scrollTop + 5 >= el.scrollHeight - el.offsetHeight;
    }
    return false;
  }

  selectKindergarden() {
    this.loader = true;
    this.receiveUser = {
      id: this.helpService.getKindergardenId(),
    };
    this.chatService
      .getMessages(this.receiveUser.id.toString())
      .subscribe((data: any) => {
        console.log(data);
        this.messages = data;
        this.chatService.getMessage(this.messages);
        this.loader = false;
      });
  }
}
