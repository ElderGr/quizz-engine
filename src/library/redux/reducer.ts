import { combineReducers } from "@reduxjs/toolkit";
import { quizzReducer } from "../../core/quizz/state/reducers";

export const rootReducer = combineReducers({
    quizz: quizzReducer
})