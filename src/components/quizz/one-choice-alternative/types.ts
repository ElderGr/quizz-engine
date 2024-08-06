import { QuizzQuestionAlternative } from "../../../core/quizz/types";

export interface AlternativeProps {
    alternative: QuizzQuestionAlternative,
    selectedAlternative: string[],
    onSelect: React.Dispatch<React.SetStateAction<string[]>>
}