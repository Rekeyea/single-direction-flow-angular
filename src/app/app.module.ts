import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NotificationBarComponent } from './views/notification-bar/notification-bar.component';
import { ChatViewComponent } from './views/chat-view/chat-view.component';
import { MiniChatComponent } from './views/mini-chat/mini-chat.component';
import { LayoutViewComponent } from './views/layout-view/layout-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { AppReducer, AppState } from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MessagesEffects } from './store/messages/messages.effects';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { InfrastructureEffects } from './store/infrastructure/infrastructure.effects';
import { NgxSpinnerModule } from "ngx-spinner";

export function logger(reducer: ActionReducer<AppState>): any {
  // default, no options
  return storeLogger()(reducer);
}

export const metaReducers = environment.production ? [] : [logger];

@NgModule({
  declarations: [
    NotificationBarComponent,
    ChatViewComponent,
    MiniChatComponent,
    LayoutViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    StoreModule.forRoot(AppReducer, {metaReducers}),
    EffectsModule.forRoot([MessagesEffects, InfrastructureEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 100, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [LayoutViewComponent]
})
export class AppModule { }
