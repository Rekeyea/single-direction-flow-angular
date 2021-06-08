import { Component, OnInit } from '@angular/core';
import {faFlag} from "@fortawesome/free-solid-svg-icons";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { getError } from 'src/app/store/infrastructure/infrastructure.selectors';
import { getAllThreads } from 'src/app/store/threads/threads.selectors';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css']
})
export class NotificationBarComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  public faFlag = faFlag;

  public unreads$ !: Observable<number>;

  public error$ !: Observable<string>;

  ngOnInit(): void {
    this.error$ = this.store.select(getError);
    this.unreads$ = this.store.select(getAllThreads)
      .pipe(
        map(threads => threads.reduce((sum, thread) => sum + thread.unreadMessages.length, 0))
      );
  }

}
