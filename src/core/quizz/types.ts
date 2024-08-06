export enum QuizzQuestionTypeEnum {
    ONE_CHOISE = 'one_choise',
    MULTIPLE_CHOISE = 'multiple_choise',
    INPUT_QUESTION = 'input_question'
}

export interface Quizz {
    id: string;
    title: string;
    description?: string;
    tumbImage: string;
    questions: QuizzQuestion[]
}

export interface QuizzQuestion {
    id: string;
    title: string;
    imageSource: string;
    description: string;
    type: QuizzQuestionTypeEnum;
    alternatives: QuizzQuestionAlternative[];
    nextQuestion?: {
        awnserMatch: string[]
        questionId: string
    }[];
}

export interface QuizzQuestionAlternative {
    id: string;
    title: string;
}

