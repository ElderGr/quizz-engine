import { createReducer } from "@reduxjs/toolkit";
import { clearQuestionState, confirmAnswer, nextQuestion, selectQuizz } from "./actions";
import { QuizzReducer } from "./types";
import { QuizzQuestionTypeEnum } from "../types";

const initialState: QuizzReducer = {
    selectedQuizz: {
        id: '',
        title: '',
        questions: [],
    },
    remaningQuestions: [],
    selectedQuestion: undefined,
    score: {
        correct: 0
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
        .addCase(confirmAnswer, (state, { payload: { awnsers, question } }) => {
            if(question.type === QuizzQuestionTypeEnum.ONE_CHOISE) {
                const userGotRight = question.alternatives.find(alternative => awnsers.includes(alternative.id) && alternative.isAwnser)
                if(userGotRight) {
                    state.score.correct += 1
                }
            } else if (question.type === QuizzQuestionTypeEnum.MULTIPLE_CHOISE) {
                const alternatives = question.alternatives.filter(alternative => awnsers.includes(alternative.id))
                const scoreMade = alternatives.reduce((prev, curr) => prev + (curr.weigth ?? 0), 0)
                state.score.correct += scoreMade
            } else if (question.type === QuizzQuestionTypeEnum.INPUT_QUESTION) {
                const userWords = awnsers[0].toLowerCase().split(' ');
                const matchedKeywords = question.awnserKeywords.filter(keyword =>
                  userWords.includes(keyword.toLowerCase())
                );
                state.score.correct += matchedKeywords.length / question.awnserKeywords.length;
            }

            return state
        })
        .addCase(clearQuestionState, (state) => {
            state = initialState
            return state
        })
})