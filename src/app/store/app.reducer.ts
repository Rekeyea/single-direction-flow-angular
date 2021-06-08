import { messagesReducer, MessagesState } from "./messages/messages.reducer";
import { preferencesReducer, PreferencesState } from "./infrastructure/infrastructure.reducer";
import { threadsReducer, ThreadsState } from "./threads/threads.reducer";

export interface AppState {
    messages: MessagesState,
    preferences: PreferencesState,
    threads: ThreadsState
} 

export const AppReducer = {
    messages: messagesReducer,
    preferences: preferencesReducer,
    threads: threadsReducer
}