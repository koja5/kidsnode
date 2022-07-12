import { InjectionToken, NgModule } from '@angular/core';
import { ChatComponent } from '../chat.component';
import { ChatRouting } from './chat-routing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../../../../../environments/environment';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChatService } from 'src/app/services/chat.service';

@NgModule({
  declarations: [ChatComponent],
  imports: [
    ChatRouting,
    FormsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [ChatService],
})
export class ChatModule {}
