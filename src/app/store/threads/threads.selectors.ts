import { createSelector } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { ThreadsState } from "./threads.reducer";

export const selectThreadsState = (state:AppState) => state.threads;

export const getAllThreads = createSelector(
    selectThreadsState,
    (state: ThreadsState) => state.threads
)

export const getSelectedThreadId = createSelector(
    selectThreadsState,
    (state: ThreadsState) => state.selectedThreadId
)