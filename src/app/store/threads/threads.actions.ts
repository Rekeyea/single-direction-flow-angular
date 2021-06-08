import { createAction, props } from "@ngrx/store";
import { IMessage } from "src/app/models/models";

export const SetSelectedThread = createAction(
    "[THREADS] Set Selected Thread",
    props<{threadId: number}>()
)