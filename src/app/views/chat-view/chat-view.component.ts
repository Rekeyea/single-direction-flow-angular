import { Component, OnInit } from '@angular/core';
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMessage, IThreadSummary } from 'src/app/models/models';
import { TextWritten } from 'src/app/store/messages/messages.actions';
import { SetSelectedThread } from 'src/app/store/threads/threads.actions';
import { AppState } from 'src/app/store/app.reducer';
import { ThreadsState } from 'src/app/store/threads/threads.reducer';
import { getAllMessages } from 'src/app/store/messages/messages.selectors';
import { getAllThreads, getSelectedThreadId } from 'src/app/store/threads/threads.selectors';


@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  paperPlane = faPaperPlane;

  postMessage = (text: string) => this.store.dispatch(TextWritten({text}));

  selectThread = (threadId: number) => this.store.dispatch(SetSelectedThread({threadId}));

  messages$ !: Observable<IMessage[]>;
  
  threadsInfo$ !: Observable<{threads: IThreadSummary[], threadId: number}>;

  public text:string = "";

  ngOnInit(): void {
    this.messages$ = this.store.select(getAllMessages);
    
    this.threadsInfo$ = combineLatest([
        this.store.select(getSelectedThreadId),
        this.store.select(getAllThreads)
      ])
      .pipe(map(([threadId, threads]) => ({ threadId, threads })));
  }

  public send(){
    this.postMessage(this.text);
    this.text = "";
  }

  public setSelected(threadId: number){
    this.selectThread(threadId);
  }

}
