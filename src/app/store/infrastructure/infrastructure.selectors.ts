import { createSelector } from "@ngrx/store";
import { AppState } from "../app.reducer";
import { PreferencesState } from "./infrastructure.reducer";

export const selectPreferencesState = (state:AppState) => state.preferences;

export const getSender = createSelector(
    selectPreferencesState,
    (state: PreferencesState) => state.sender
)

export const getError = createSelector(
    selectPreferencesState,
    (state: PreferencesState) => state.error
)