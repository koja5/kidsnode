import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { HelpService } from './help.service';
import { CallApiService } from './call-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public url =
    window.location.protocol + '//' + window.location.hostname + ':' + 3001;
  constructor(
    private callApi: CallApiService,
    private helpService: HelpService
  ) {}
  private socket = io(this.url);

  generateSocket() {
    return io(this.url);
  }

  joinToKindergarden() {
    const data = {
      account_id: this.helpService.getUserId(),
      kindergarden: this.helpService.getKindergardenId(),
    };
    this.socket.emit('join', data);
  }

  checkWhenNewClientLogged() {
    this.socket.on('joined', (data: any) => {
      
    });
  }

  sendMessage(data: any) {
    this.socket.emit('message', data);
  }

  getMessage(messages: any[]) {
    this.socket.on('received_message', (data) => {
      console.log(data);
      messages.push(data);
    });
  }

  getSequenceNumber() {
    this.socket.on('seq-num', (msg) => console.log(msg));
  }
}
