import { createReducer, on } from "@ngrx/store";
import { IThreadSummary } from "src/app/models/models";
import { SetSelectedThread } from "./threads.actions";
import produce from "immer";
import { ReceiveMessage } from "../messages/messages.actions";

export interface ThreadsState {
  selectedThreadId: number,
  threads: IThreadSummary[];
}

const initialState: ThreadsState = {
  selectedThreadId: 1,
  threads: [
    {
      threadId: 1,
      initials: "DC",
      name: "December Labs",
      unreadMessages: []
    },
    {
      threadId: 2,
      initials: "PC",
      name: "Private Conversation",
      unreadMessages: []
    }
  ]
};

export const threadsReducer = createReducer(
  initialState,
  on(SetSelectedThread, (state, { threadId }) => produce(state, state => {
    state.selectedThreadId = threadId;
    const thread = state.threads.find(x => x.threadId === threadId);
    if(thread){
      thread.unreadMessages = [];
    }
  })),
  on(ReceiveMessage, (state, { message }) => produce(state, state => {
    if (message.threadId !== state.selectedThreadId) {
      const thread = state.threads.find(x => x.threadId === message.threadId);
      if (thread) {
        thread.unreadMessages.push(message);
      }
    }
  }))
)