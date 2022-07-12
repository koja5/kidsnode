import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { ChatMessage } from '../models/chat-message-model';

type NewType = undefined;

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  user!: firebase.User;
  chatMessages: AngularFireList<ChatMessage[]> | NewType;
  public chatMessage: ChatMessage[] = [];
  userName!: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth !== undefined && auth !== null) {
        this.user = auth;
      }

      this.getUser()
        .valueChanges()
        .subscribe((a: any) => {
          this.userName = a.displayName;
        });
    });
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = 'kojaaa';
    this.chatMessages = this.getMessages();
    const messageChat: ChatMessage[] = [
      {
        message: msg,
        timeSent: timestamp,
        userName: this.userName as unknown as string,
        email: email ? email : undefined,
      },
    ];
    this.chatMessages.push(messageChat);
  }

  getMessages(): AngularFireList<ChatMessage[]> {
    // query to create our message feed binding
    return this.db.list('messages');
  }

  getTimeStamp() {
    const now = new Date();
    const date =
      now.getUTCFullYear() +
      '/' +
      (now.getUTCMonth() + 1) +
      '/' +
      now.getUTCDate();
    const time =
      now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();

    return date + ' ' + time;
  }
}
