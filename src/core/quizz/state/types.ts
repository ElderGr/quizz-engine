import { Quizz, QuizzQuestion } from "../types";

export interface QuizzReducer {
    selectedQuizz: Quizz;
    selectedQuestion?: number;
    remaningQuestions: QuizzQuestion[];
    score: {
        correct: string[];
        incorrect: string[];
    }
}