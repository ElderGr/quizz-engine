import { Quizz, QuizzQuestion } from "../types";

export interface QuizzReducer {
    selectedQuizz: Omit<Quizz, 'questions'>;
    selectedQuestion: number;
    questions: QuizzQuestion[];
    userAwnsers: UserAwnsers[]
}

export interface UserAwnsers {
    questionId: string;
    awnsers: string[]
}

export interface IConfirmAnswerAction {
    awnsers: string[];
    question: QuizzQuestion
}