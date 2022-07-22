import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  // public url =
  //   window.location.protocol +
  //   '//' +
  //   window.location.hostname +
  //   ':' +
  //   window.location.port;

  // public newFullname = new Subject<any>();
  // public userInfo = new Subject<null>();
  // public navigationItemFeed = new Subject<null>();
  // public messageForThisUser = new Subject<any>();

  // constructor(private http: HttpClient) {}

  // private socket = io(this.url);

  // joinRoom(data: any) {
  //   this.socket.emit('join', data);
  // }

  // newUserJoined() {
  //   let observable = new Observable<{
  //     date: String;
  //     message: String;
  //     sender_id: String;
  //   }>((observer) => {
  //     this.socket.on('new user joined', (data: any) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });

  //   return observable;
  // }

  // leaveRoom(data: any) {
  //   this.socket.emit('leave', data);
  // }

  // userLeftRoom() {
  //   let observable = new Observable<{
  //     date: String;
  //     message: String;
  //     sender_id: String;
  //   }>((observer) => {
  //     this.socket.on('left room', (data: any) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });

  //   return observable;
  // }

  // sendMessage(data: any) {
  //   this.socket.emit('message', data);
  // }

  // newMessageReceived() {
  //   let observable = new Observable<{
  //     sender_id: String;
  //     message: String;
  //     fullname: String;
  //     image: String;
  //     date: String;
  //     not_seen: String;
  //   }>((observer) => {
  //     this.socket.on('new message', (data: any) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });

  //   return observable;
  // }

  // getNotification() {
  //   let observable = new Observable<{
  //     text: String;
  //   }>((observer) => {
  //     this.socket.on('notification', (data: any) => {
  //       observer.next(data);
  //     });
  //     return () => {
  //       this.socket.disconnect();
  //     };
  //   });

  //   return observable;
  // }

  // createMessage(data: any) {
  //   return this.http.post('/api/createMessage', data);
  // }

  // getAllMessagesForUser(id: any) {
  //   return this.http.get('/api/getAllMessagesForUser/' + id);
  // }

  // getMessageForSelectedUser(id: any) {
  //   return this.http.get('/api/getMessageForSelectedUser/' + id);
  // }

  // getOrCreate(data: any) {
  //   return this.http.post('/api/getOrCreate', data);
  // }

  // pushNewMessage(data: any) {
  //   this.socket.emit('new message', { username: 'john' });
  //   return this.http.post('/api/pushNewMessage', data);
  // }

  // updateSeen(data: any) {
  //   return this.http.post('/api/updateSeen', data);
  // }

  // searchUser(filter: any) {
  //   return this.http.post('/api/searchUser', filter);
  // }

  // sendNewFullname() {
  //   this.newFullname.next();
  // }

  // getNewFullname() {
  //   return this.newFullname.asObservable();
  // }

  // sendUserInfo() {
  //   this.userInfo.next();
  // }

  // getUserInfo() {
  //   return this.userInfo.asObservable();
  // }

  // sendMessageForThisUser(data: any) {
  //   this.messageForThisUser.next(data);
  // }

  // getMessageForThisUser() {
  //   return this.messageForThisUser.asObservable();
  // }
}
