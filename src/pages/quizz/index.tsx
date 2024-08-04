import { useDispatch, useSelector } from "react-redux"
import { currentQuizzQuestionSelector, remaningQuestionsSelector, selectedQuizzSelector } from "../../core/quizz/state/selectors"
import { useEffect, useState } from "react"
import { useCountdown } from "../../shared/hooks/useCountdown"
import { QuizzQuestionAlternative, QuizzQuestionTypeEnum } from "../../core/quizz/types"
import { confirmAnswer, nextQuestion } from "../../core/quizz/state/actions"
import { useNavigate } from "react-router"

const renderQuizzAlternative = {
    [QuizzQuestionTypeEnum.ONE_CHOISE]: (
        alternative: QuizzQuestionAlternative,
        selectedAlternative: string | null,
        onSelect: (alternative: string) => void
    ) => (
        <div>
            <input 
                type='radio'
                name="alternatives"
                onChange={() => onSelect(alternative.id)}
                checked={selectedAlternative === alternative.id}
            />
            <label htmlFor="alternatives">{alternative.title}</label>
        </div>
    ),
    [QuizzQuestionTypeEnum.MULTIPLE_CHOISE]: (
        alternative: QuizzQuestionAlternative,
        selectedAlternative: string | null,
        onSelect: (alternative: string) => void
    ) => (
        <div>
            <input 
                type='checkbox'
                id={`alternative-${alternative.id}`}
                name="alternatives"
                onChange={() => onSelect(alternative.id)} 
                checked={selectedAlternative === alternative.id}
            />
            <label htmlFor={`alternative-${alternative.id}`}>{alternative.title}</label>
        </div>
    ),
    [QuizzQuestionTypeEnum.INPUT_QUESTION]: (
        alternative: QuizzQuestionAlternative,
        selectedAlternative: string | null,
        onSelect: (alternative: string) => void

    ) => <input type='text' />
}

export function QuizzPage() {
    const question = useSelector(currentQuizzQuestionSelector)
    const selectedQuizz = useSelector(selectedQuizzSelector)
    const remaningQuestions = useSelector(remaningQuestionsSelector)
    const dispatch = useDispatch()
    const [selectedAlternativeId, setSelectedAlternativeId] = useState<string | null>(null);
    const navigate = useNavigate()


    const { timeLeft, resetTimer, startTimer } = useCountdown({
        initialTime: 300,
    })

    useEffect(() => startTimer(), []);

    const onNextQuestion = () => {
        const selectedAlternative = question?.alternatives.find(alternative => alternative.id === selectedAlternativeId)
        if (selectedAlternative) dispatch(confirmAnswer(selectedAlternative))
        dispatch(nextQuestion())
        resetTimer()
    }

    const onFinishQuizz = () => {
        navigate(`/quizz/${selectedQuizz.id}/feedback`)
    }


    return (
        <div>
            <h1>Quizz Page</h1>
            <div>
                <div>{question?.title}</div>
                Time left: 
                {`${Math.floor(timeLeft / 60)}`.padStart(2, '0')}:{`${timeLeft % 60}`.padStart(2, '0')}
                <img src={question?.imageSource} />
                <div>{question?.description}</div>

                <div>
                    {!question || renderQuizzAlternative[question?.type] === undefined ? 
                        'No alternatives' 
                        :
                        question?.alternatives.map(
                            alternative => renderQuizzAlternative[question.type](
                                alternative, 
                                selectedAlternativeId,
                                (id) => setSelectedAlternativeId(id)
                            )
                        )
                    }
                </div>
                <div>
                    {remaningQuestions.length !== 0 ? (
                        <button onClick={onNextQuestion}>next question</button>
                    ) : (
                        <button onClick={onFinishQuizz}>finish quizz</button>
                    )}
                </div>
            </div>
        </div>
    )
}