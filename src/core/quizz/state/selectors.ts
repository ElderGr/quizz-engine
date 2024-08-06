import { createSelector } from "@reduxjs/toolkit";
import { IRootState } from "../../../library/redux/types";

export const quizzSelector = (state: IRootState) => state.quizz

export const selectedQuizzSelector = createSelector(quizzSelector, (quizz) => quizz.selectedQuizz)
export const currentQuizzQuestionSelector = createSelector(quizzSelector, (quizz) => {
    return quizz.selectedQuestion !== undefined ? quizz.questions[quizz.selectedQuestion] : undefined
})

export const isLastQuestionSelector = createSelector(quizzSelector, (quizz) => {
    return !quizz.questions[quizz.selectedQuestion + 1]
})