import { Component, OnInit } from '@angular/core';
import {faPaperPlane, faTimes} from "@fortawesome/free-solid-svg-icons";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMessage } from 'src/app/models/models';
import { TextWritten } from 'src/app/store/messages/messages.actions';
import { AppState } from 'src/app/store/app.reducer';
import { getAllMessagesFromThread } from 'src/app/store/messages/messages.selectors';

@Component({
  selector: 'app-mini-chat',
  templateUrl: './mini-chat.component.html',
  styleUrls: ['./mini-chat.component.css']
})
export class MiniChatComponent implements OnInit {

  paperPlane = faPaperPlane;
  close = faTimes;

  public visible:boolean = false;

  postMessage = (text: string) => this.store.dispatch(TextWritten({text, threadId: 1}));

  messages$!: Observable<IMessage[]>;
  
  public text: string = "";

  constructor(private store: Store<AppState>) { }


  ngOnInit(): void {
    this.messages$ = this.store.select(getAllMessagesFromThread, { threadId: 1 });
  }

  openClose(){
    this.visible = !this.visible;
  }

  public send(){
    this.postMessage(this.text);
    this.text = "";
  }
}
