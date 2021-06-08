import { Injectable } from "@angular/core";
import { act, Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { ReceiveMessage, TextWritten } from "./messages.actions";
import {catchError, concatAll, concatMap, debounceTime, delay, map, mergeMap, switchMap, tap, withLatestFrom} from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { getSender } from "../infrastructure/infrastructure.selectors";
import { IMessage } from "src/app/models/models";
import { getSelectedThreadId } from "../threads/threads.selectors";
import { concat, Observable, of } from "rxjs";
import { EndLoader, ErrorThrown, StartLoader } from "../infrastructure/infrastructure.actions";

@Injectable()
export class MessagesEffects {
    
    // Use switchMap to dispatch the whole array of actions
    @Effect() 
    textWritten$ = this.actions$.pipe(
        ofType(TextWritten),
        delay(2000),
        tap(({text}) => {
            if(!text || text === ""){
                throw new Error("Message cannot be blank");
            }
        }),
        withLatestFrom(this.store.select(getSender)),
        withLatestFrom(this.store.select(getSelectedThreadId)),
        concatMap(([[action, sender], threadId]) => {
            const initials = sender.split(" ").map(x => x[0].toUpperCase()).join("");
            const message: IMessage = {
                initials,
                sender,
                threadId: action.threadId || threadId,
                timestamp: new Date().toISOString(),
                text: action.text
            };
            const receiveMessage = ReceiveMessage({message});            
            return [receiveMessage];
        }),
        catchError(error => of(ErrorThrown({error})))
    ).pipe()

    constructor(private actions$: Actions, private store: Store<AppState>){}
}