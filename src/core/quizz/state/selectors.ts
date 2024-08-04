import { createSelector } from "@reduxjs/toolkit";
import { IRootState } from "../../../library/redux/types";

export const quizzSelector = (state: IRootState) => state.quizz

export const selectedQuizzSelector = createSelector(quizzSelector, (quizz) => quizz.selectedQuizz)
export const currentQuizzQuestionSelector = createSelector(quizzSelector, (quizz) => {
    return quizz.selectedQuestion !== undefined ? quizz.remaningQuestions[quizz.selectedQuestion] : undefined
})

export const remaningQuestionsSelector = createSelector(quizzSelector, (quizz) => quizz.remaningQuestions) 
export const getQuizzScore = createSelector(quizzSelector, (quizz) => quizz.score)