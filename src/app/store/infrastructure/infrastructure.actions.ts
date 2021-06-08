import { createAction, props } from "@ngrx/store";

export const SenderSent = createAction(
    "[INFRASTRUCTURE] Sender Sent",
    props<{sender: string}>()
)

export const ErrorThrown = createAction(
    "[INFRASTRUCTURE] Error Thrown",
    props<{error: string}>()
)

export const ErrorTimePassed = createAction(
    "[INFRASTRUCTURE] Error Time Passed"
)

export const StartLoader = createAction(
    "[INFRASTRUCTURE] Start Loader"
)

export const EndLoader = createAction(
    "[INFRASTRUCTURE] End Loader"
)
