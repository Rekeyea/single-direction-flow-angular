import { createAction, props } from "@ngrx/store";
import { IMessage } from "src/app/models/models";

export const TextWritten = createAction(
    "[MESSAGES] TextWritten",
    props<{text: string, threadId?: number}>()
);

export const ReceiveMessage = createAction(
    "[MESSAGES] Receive Message",
    props<{message: IMessage}>()
)