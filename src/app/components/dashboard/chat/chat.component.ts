import { sha1 } from '@angular/compiler/src/i18n/digest';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageModel } from 'src/app/models/message.model';
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

  constructor() {}

  ngOnInit(): void {}

  // public messageText!: string;
  // public messageArray: any = [];
  // public id: any;
  // public messageData = new MessageModel();
  // public allMessages: any;
  // public user: any;
  // public selectUserForComunication: any;
  // public selectedMessage: any;
  // public windowWidth: any;
  // public windowHeight: any;
  // public messageWindow = false;
  // public mobile = false;
  // public userListLoading = false;
  // public userList: any;
  // public selectedUser: any;
  // public room: any;
  // public height: any;
  // public heighMessage: any;
  // public loading = false;

  // constructor(private helpService: HelpService, private service: ChatService) {
  //   this.service
  //     .newUserJoined()
  //     .subscribe((data) => this.messageArray.push(data));

  //   this.service
  //     .userLeftRoom()
  //     .subscribe((data) => this.messageArray.push(data));

  //   this.service.newMessageReceived().subscribe((data) => {
  //     console.log(data);
  //     this.messageArray.push(data);
  //     this.initilization();
  //   });

  //   this.service.getNotification().subscribe((data) => {
  //     console.log('dosla je notifikacija!!!!');
  //   });

  //   this.service.getMessageForThisUser().subscribe((data) => {
  //     this.getOrCreate(data);
  //   });
  // }

  // ngOnInit(): void {
  //   this.language = this.helpService.getLanguage();
  // }

  // initilization() {
  //   this.service.getAllMessagesForUser(this.id).subscribe((data) => {
  //     console.log(data);
  //     this.allMessages = data;
  //   });

  //   this.getMessageItem();
  //   this.autoScroll();
  // }

  // getMessageItem() {
  //   if (sessionStorage.getItem('message_item')) {
  //     // const message = JSON.parse(sessionStorage.getItem('message_item') ? sessionStorage.getItem('message_item') : null);
  //     const message = {
  //       id: '',
  //       image: '',
  //       name: '',
  //       profession: '',
  //       index: '',
  //       receiveId: '',
  //     };
  //     this.showMessages(
  //       message.id,
  //       message.image,
  //       message.name,
  //       message.profession,
  //       message.index,
  //       message.receiveId
  //     );
  //     sessionStorage.removeItem('message_item');
  //   } else if (sessionStorage.getItem('message_user')) {
  //     // const user = JSON.parse(sessionStorage.getItem('message_user'));
  //     const user = null;
  //     this.getOrCreate(user);
  //     sessionStorage.removeItem('message_user');
  //   }
  // }

  // join(room: any) {
  //   this.service.joinRoom({ sender_id: this.id, room: room });
  //   this.room = room;
  // }

  // leave(room: any) {
  //   this.service.leaveRoom({ sender_id: this.id, room: room });
  // }

  // updateGlobalMessageData(message: any) {
  //   let ind = 1;
  //   for (let i = 0; i < this.allMessages.length; i++) {
  //     if (this.allMessages[i].message.sender_id === message.sender_id) {
  //       this.allMessages[i].message.message = message.message;
  //       this.allMessages[i].message.date = message.date;
  //       ind = 0;
  //     }
  //   }
  //   this.allMessages.push();
  // }

  // sendMessage() {
  //   if (this.messageText !== '\n') {
  //     const data = {
  //       _id: this.room,
  //       message: {
  //         sender_id: this.id,
  //         message: this.messageText,
  //         date: new Date(),
  //       },
  //       receiveId: this.selectUserForComunication.receiveId,
  //     };
  //     this.service.pushNewMessage(data).subscribe((data) => {
  //       console.log(data);
  //     });
  //     this.service.sendMessage({
  //       sender_id: this.id,
  //       room: this.room,
  //       message: this.messageText,
  //       name: this.user.fullname,
  //       image: this.user.image,
  //       date: new Date(),
  //       not_seen: this.selectUserForComunication.receiveId,
  //     });
  //     this.messageText = '';
  //     this.autoScroll();
  //   } else {
  //     this.messageText = '';
  //   }
  // }

  // autoScroll() {
  //   var elem = document.getElementById('chat-container');
  //   var atbottom = this.scrollAtBottom(elem);
  //   var isWebkit = 'WebkitAppearance' in document.documentElement.style;
  //   var isEdge = '-ms-accelerator' in document.documentElement.style;
  //   var tempCounter = 6;
  //   if (atbottom) {
  //     this.updateScroll(elem);
  //   }
  // }

  // updateScroll(el: any) {
  //   setTimeout(() => {
  //     var elem = document.getElementById('chat-container');
  //     if (elem) {
  //       elem.scrollTop = elem.scrollHeight + 20;
  //     }
  //   }, 20);
  // }
  // scrollAtBottom(el: any) {
  //   if (el) {
  //     return el.scrollTop + 5 >= el.scrollHeight - el.offsetHeight;
  //   }
  //   return false;
  // }

  // clickOnTextArea() {
  //   const index = this.selectUserForComunication.index;
  //   if (this.allMessages[index].not_seen === this.id) {
  //     this.allMessages[index].not_seen = '';
  //   }
  // }

  // showMessages(
  //   id: any,
  //   image: any,
  //   name: any,
  //   profession: any,
  //   index: any,
  //   receiveId: any
  // ) {
  //   this.selectedMessage = id;
  //   this.room = id;
  //   this.join(id);
  //   this.loading = true;
  //   this.service.getMessageForSelectedUser(id).subscribe((data) => {
  //     console.log(data);
  //     this.selectUserForComunication = {
  //       name: name,
  //       profession: profession,
  //       image: image,
  //       receiveId: receiveId,
  //       index: index,
  //     };
  //     this.messageArray = data;
  //     if (this.mobile) {
  //       this.messageWindow = true;
  //     }
  //     if (this.allMessages[index].not_seen === this.id) {
  //       const notSeenData = {
  //         _id: id,
  //         not_seen: '',
  //       };
  //       this.service.updateSeen(notSeenData).subscribe((data) => {
  //         console.log(data);
  //       });
  //     }
  //     this.updateScroll(null);
  //     this.loading = false;
  //   });
  // }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   if (window.innerWidth < 768) {
  //     this.windowWidth = window.innerWidth;
  //     this.windowHeight = window.innerHeight;
  //     this.mobile = true;
  //   } else {
  //     this.windowWidth = null;
  //     this.windowHeight = null;
  //     this.mobile = false;
  //   }
  //   this.messageWindow = false;
  //   if (window.innerWidth > 992) {
  //     this.height = window.innerHeight - 173;
  //   } else {
  //     this.height = window.innerHeight - 223;
  //   }
  //   this.height += 'px';
  // }

  // onValueChange(event: any) {
  //   console.log(event);
  //   if (event === undefined) {
  //     this.selectUserForComunication = null;
  //   } else {
  //     this.getOrCreate(event);
  //   }
  // }

  // searchUser(event: any) {
  //   console.log(event);
  //   if (event !== '' && event.length > 2) {
  //     this.userListLoading = true;
  //     const searchFilter = {
  //       filter: event,
  //     };
  //     this.service.searchUser(searchFilter).subscribe((val: any) => {
  //       this.userList = val.sort((a: any, b: any) =>
  //         String(a['fullname']).localeCompare(String(b['fullname']))
  //       );
  //       this.userListLoading = false;
  //     });
  //   } else {
  //     this.userList = [];
  //   }
  // }

  // selectionChangeUser(event: any) {
  //   console.log(event);
  // }

  // getOrCreate(user: any) {
  //   const data = {
  //     sender1: this.id,
  //     sender2: sha1(user.id.toString()),
  //     messages: [],
  //   };

  //   this.service.getOrCreate(data).subscribe((data: any) => {
  //     if (data.info === 'get') {
  //       this.messageArray = data['messages'][0]['messages'];
  //       this.join(data['messages'][0]['_id']);
  //     } else {
  //       this.join(data['id']);
  //       this.messageArray = [];
  //     }

  //     this.selectUserForComunication = {
  //       name: user.fullname,
  //       profession: user.profession,
  //       image: user.image,
  //     };
  //     if (this.mobile) {
  //       this.messageWindow = true;
  //     }
  //     setTimeout(() => {
  //       this.updateScroll(null);
  //     }, 50);
  //   });
  // }

  sendMessage() {}
}
