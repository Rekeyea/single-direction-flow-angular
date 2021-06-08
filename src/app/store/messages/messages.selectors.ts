import { createSelector } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { MessagesState } from "./messages.reducer";
import { PreferencesState } from "../infrastructure/infrastructure.reducer";
import { ThreadsState } from "../threads/threads.reducer";
import { selectPreferencesState } from "../infrastructure/infrastructure.selectors";
import { selectThreadsState } from "../threads/threads.selectors";


export const selectMessagesState = (state:AppState) => state.messages;


export const getAllMessages = createSelector(
    selectMessagesState,
    selectThreadsState,
    (state: MessagesState, threads: ThreadsState) => state.filter(x => x.threadId === threads.selectedThreadId)
)

export const getAllMessagesFromThread = createSelector(
    selectMessagesState,
    (state: MessagesState, props: {threadId: number}) => state.filter(x => x.threadId === props.threadId)
)