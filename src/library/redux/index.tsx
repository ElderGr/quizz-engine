import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";
import { IRootState } from "./types";

export const store = configureStore<IRootState>({
    reducer: rootReducer
})