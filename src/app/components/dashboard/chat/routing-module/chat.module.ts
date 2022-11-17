import { InjectionToken, NgModule } from '@angular/core';
import { ChatComponent } from '../chat.component';
import { ChatRouting } from './chat-routing';

import { environment } from '../../../../../environments/environment';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SharingModule } from 'src/app/sharing.module';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    ChatRouting,
    FormsModule,
    RouterModule,
    SharingModule
  ],
  providers: [ChatService],
})
export class ChatModule {}
