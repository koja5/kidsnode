import { InjectionToken, NgModule } from '@angular/core';
import { ChatComponent } from '../chat.component';
import { ChatRouting } from './chat-routing';

import { environment } from '../../../../../environments/environment';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    ChatRouting,
    FormsModule,
    RouterModule
  ],
  providers: [ChatService],
})
export class ChatModule {}
