import { createReducer } from "@reduxjs/toolkit";
import { clearQuestionState, confirmAnswer, nextQuestion, selectQuizz } from "./actions";
import { QuizzReducer } from "./types";

const initialState: QuizzReducer = {
    selectedQuizz: {
        id: '',
        title: '',
        questions: [],
    },
    remaningQuestions: [],
    selectedQuestion: undefined,
    score: {
        correct: [],
        incorrect: []
    }
}

export const quizzReducer = createReducer<QuizzReducer>(initialState, (builder) => {
    builder
        .addCase(selectQuizz, (state, action) => {
            state.selectedQuizz = action.payload
            state.remaningQuestions = action.payload.questions;
            const randomIndex = Math.floor(Math.random() * (state.remaningQuestions.length - 0 + 1)) + 0;

            state.selectedQuestion = randomIndex
            
            return state
        })
        .addCase(nextQuestion, (state) => {
            if(state.selectedQuestion !== undefined){
                state.remaningQuestions.splice(state.selectedQuestion, 1)
            }
            const randomIndex = Math.floor(Math.random() * state.remaningQuestions.length)
            state.selectedQuestion = randomIndex
            return state
        })
        .addCase(confirmAnswer, (state, action) => {
            if(action.payload.isAwnser) {
                state.score.correct.push(action.payload.id)
            } else {
                state.score.incorrect.push(action.payload.id)
            }

            return state
        })
        .addCase(clearQuestionState, (state) => {
            state = initialState
            return state
        })
})