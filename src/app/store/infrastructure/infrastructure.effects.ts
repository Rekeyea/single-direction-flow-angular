import { Injectable } from "@angular/core";
import {  Actions, Effect, ofType } from "@ngrx/effects";
import {concatMap, delay, filter, switchMap, tap, } from "rxjs/operators";
import { Store } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { of } from "rxjs";
import { EndLoader, ErrorThrown, ErrorTimePassed, StartLoader } from "../infrastructure/infrastructure.actions";
import { NgxSpinnerService } from "ngx-spinner";
import { ReceiveMessage, TextWritten } from "../messages/messages.actions";

@Injectable()
export class InfrastructureEffects {
    
    @Effect() 
    errorThrown$ = this.actions$.pipe(
        ofType(ErrorThrown),
        concatMap(() => of(ErrorTimePassed()).pipe(delay(5000)) ) 
    );

    @Effect({dispatch: false}) 
    showLoader$ = this.actions$.pipe(
        ofType(StartLoader),
        tap(() => this.spinner.show())
    );

    @Effect({dispatch: false}) 
    hideLoader$ = this.actions$.pipe(
        ofType(EndLoader),
        tap(() => this.spinner.hide())
    );

    @Effect()
    loadingActions$ = this.actions$.pipe(
        filter(({type}) => type === TextWritten.type),
        concatMap(() => [StartLoader()])
    );

    @Effect()
    unloadingActions$ = this.actions$.pipe(
        filter(({type}) => type === ReceiveMessage.type),
        concatMap(() => [EndLoader()])
    );

    constructor(private actions$: Actions, private store: Store<AppState>, private spinner: NgxSpinnerService){}
}