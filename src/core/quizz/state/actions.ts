import { createAction } from "@reduxjs/toolkit";
import { Quizz } from "../types";
import { IConfirmAnswerAction } from "./types";

export const selectQuizz = createAction<Quizz>('QUIZZ/SELECT')
export const confirmAnswer = createAction<IConfirmAnswerAction>('QUIZZ/CONFIRM-ANSWER')
export const clearQuestionState = createAction('QUIZZ/CLEAR-QUESTION-STATE')