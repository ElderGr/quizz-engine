export enum QuizzQuestionTypeEnum {
    ONE_CHOISE = 'one_choise',
    MULTIPLE_CHOISE = 'multiple_choise',
    INPUT_QUESTION = 'input_question'
}

export enum QuizzQuestionDifficultyEnum {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export interface Quizz {
    id: string;
    title: string;
    questions: QuizzQuestion[]
}

export interface QuizzQuestion {
    id: string;
    title: string;
    imageSource: string;
    description: string;
    difficulty: QuizzQuestionDifficultyEnum;
    type: QuizzQuestionTypeEnum;
    alternatives: QuizzQuestionAlternative[];
    awnserKeywords: string[];
}

export interface QuizzQuestionAlternative {
    id: string;
    title: string;
    isAwnser: boolean;
    weigth: number;
}

