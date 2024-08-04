import { createAction } from "@reduxjs/toolkit";
import { Quizz, QuizzQuestionAlternative } from "../types";

export const selectQuizz = createAction<Quizz>('QUIZZ/SELECT')
export const confirmAnswer = createAction<QuizzQuestionAlternative>('QUIZZ/CONFIRM-ANSWER')
export const nextQuestion = createAction('QUIZZ/NEXT-QUESTION')
export const clearQuestionState = createAction('QUIZZ/CLEAR-QUESTION-STATE')