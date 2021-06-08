import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { ErrorThrown, ErrorTimePassed, SenderSent } from "./infrastructure.actions";

export interface PreferencesState {
    sender: string,
    error: string
};

const initialState: PreferencesState = {
    sender: "Anonymous",
    error: ""
};

export const preferencesReducer = createReducer(
    initialState,
    on(SenderSent, (state, { sender }) => ({...state, sender})),
    on(ErrorThrown, (state, {error}) => ({...state, error})),
    on(ErrorTimePassed, state => ({...state, error: ""}))
)