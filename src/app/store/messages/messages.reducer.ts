import { createReducer, on } from "@ngrx/store";
import { IMessage } from "src/app/models/models";
import { ReceiveMessage } from "./messages.actions";

export type MessagesState = IMessage[];

const initialState: MessagesState = [
    {
    threadId: 1,
    sender: "Mathias Rodriguez",
    initials: "MR",
    timestamp: "2021-02-03T09:30Z",
    text: "Bigzanoli está deveno."
    },
    {
    threadId: 1,
    sender: "Emiliano Conti",
    initials: "EC",
    timestamp: "2021-02-03T10:00Z",
    text: "Si, Martin Biganzoli es Hermoso."
    }
];

export const messagesReducer = createReducer(
    initialState,
    on(ReceiveMessage, (state, {message}) => [...state, message])
)