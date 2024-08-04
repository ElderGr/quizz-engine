import mock from '../mock/quizz_1.json'
import { Quizz } from "../types"

export const useListQuizz = (): Quizz[] => {
    const quizzMockedList = [mock as Quizz]
    
    return quizzMockedList
}