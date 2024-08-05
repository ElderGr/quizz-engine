import { Quizz, QuizzQuestion } from "../types";

export interface QuizzReducer {
    selectedQuizz: Quizz;
    selectedQuestion?: number;
    remaningQuestions: QuizzQuestion[];
    score: {
        correct: number;
    }
}

export interface IConfirmAnswerAction {
    awnsers: string[];
    question: QuizzQuestion
}