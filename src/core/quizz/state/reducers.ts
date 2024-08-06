import { createReducer } from "@reduxjs/toolkit";
import { clearQuestionState, confirmAnswer, selectQuizz } from "./actions";
import { QuizzReducer } from "./types";
import { QuizzQuestionTypeEnum } from "../types";

const initialState: QuizzReducer = {
    selectedQuizz: {
        id: '',
        tumbImage: '',
        title: '',
    },
    questions: [],
    userAwnsers: [],
    selectedQuestion: 0,
}

export const quizzReducer = createReducer<QuizzReducer>(initialState, (builder) => {
    builder
        .addCase(selectQuizz, (state, action) => {
            state.selectedQuizz = action.payload
            state.questions = action.payload.questions;
            
            return state
        })
        .addCase(confirmAnswer, (state, { payload: { awnsers, question } }) => {
            if(question.type === QuizzQuestionTypeEnum.ONE_CHOISE) {
                const nextQuestion = question.nextQuestion?.find(nextQuestion => nextQuestion.awnserMatch.includes(awnsers[0]))
                if(nextQuestion) {
                    const nextQuestionIndex = state.questions.findIndex(question => question.id === nextQuestion.questionId)
                    state.selectedQuestion = nextQuestionIndex
                }else{
                    state.selectedQuestion += 1
                }
            } else if (question.type === QuizzQuestionTypeEnum.MULTIPLE_CHOISE) {
                const nextQuestion = question.nextQuestion?.find(nextQuestion => {
                    const isWrongMatch = nextQuestion.awnserMatch.some(awnserMatch => !awnsers.includes(awnserMatch))
                    if(!isWrongMatch) return true
                    return false
                })
                if(nextQuestion) {
                    const nextQuestionIndex = state.questions.findIndex(question => question.id === nextQuestion.questionId)
                    state.selectedQuestion = nextQuestionIndex
                }else{
                    state.selectedQuestion += 1
                }                
            } else if (question.type === QuizzQuestionTypeEnum.INPUT_QUESTION) {
                if(question.nextQuestion !== undefined) {
                    const nextQuestionId = question.nextQuestion[0].questionId
                    const nextQuestionIndex = state.questions.findIndex(question => question.id === nextQuestionId)
                    state.selectedQuestion = nextQuestionIndex
                }else{
                    state.selectedQuestion += 1
                }
            }

            state.userAwnsers.push({
                questionId: question.id,
                awnsers
            })

            return state
        })
        .addCase(clearQuestionState, (state) => {
            state = initialState
            return state
        })
})