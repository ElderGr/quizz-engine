import { useDispatch, useSelector } from "react-redux"
import { currentQuizzQuestionSelector, remaningQuestionsSelector, selectedQuizzSelector } from "../../core/quizz/state/selectors"
import { useEffect, useState } from "react"
import { useCountdown } from "../../shared/hooks/useCountdown"
import { QuizzQuestionAlternative, QuizzQuestionTypeEnum } from "../../core/quizz/types"
import { confirmAnswer, nextQuestion } from "../../core/quizz/state/actions"
import { useNavigate } from "react-router"

const renderQuizzAlternative = {
    [QuizzQuestionTypeEnum.ONE_CHOISE]: (
        alternatives: QuizzQuestionAlternative[],
        selectedAlternative: string[],
        onSelect: React.Dispatch<React.SetStateAction<string[]>>
    ) => (
        <div>
            {alternatives.map((alternative) => (
                <>
                <input 
                    type='radio'
                    id={`alternative-${alternative.id}`}
                    name="alternatives"
                    onChange={() => onSelect([alternative.id])}
                    checked={selectedAlternative[0] === alternative.id}
                />
                <label htmlFor={`alternative-${alternative.id}`}>{alternative.title}</label>
                </>
            ))}
        </div>
    ),
    [QuizzQuestionTypeEnum.MULTIPLE_CHOISE]: (
        alternatives: QuizzQuestionAlternative[],
        selectedAlternative: string[],
        onSelect: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        const toggleAlternative = (alternativeId: string) => {
            const newSelectedAlternative = selectedAlternative.includes(alternativeId)
                ? selectedAlternative.filter(id => id !== alternativeId)
                : [...selectedAlternative, alternativeId]
            onSelect(newSelectedAlternative)
        }

        return (
            <div>
                {alternatives.map((alternative) => (
                    <>
                        <input 
                            type='checkbox'
                            id={`alternative-${alternative.id}`}
                            name="alternatives"
                            onChange={() => toggleAlternative(alternative.id)} 
                            checked={selectedAlternative.includes(alternative.id)}
                        />
                        <label htmlFor={`alternative-${alternative.id}`}>{alternative.title}</label>
                    </>
                ))}
            </div>
        )
    },
    [QuizzQuestionTypeEnum.INPUT_QUESTION]: (
        alternatives: QuizzQuestionAlternative[],
        selectedAlternative: string[],
        onSelect: React.Dispatch<React.SetStateAction<string[]>>

    ) => <input 
            type='text' 
            onChange={(e) => onSelect([e.target.value])}
            value={selectedAlternative[0]} 
        />
}

export function QuizzPage() {
    const question = useSelector(currentQuizzQuestionSelector)
    const selectedQuizz = useSelector(selectedQuizzSelector)
    const remaningQuestions = useSelector(remaningQuestionsSelector)
    const dispatch = useDispatch()
    const [selectedAlternativeId, setSelectedAlternativeId] = useState<string[]>([]);
    const navigate = useNavigate()


    const { timeLeft, resetTimer, startTimer } = useCountdown({
        initialTime: 300,
    })

    useEffect(() => startTimer(), []);

    const onNextQuestion = () => {
        if(!question) return
        dispatch(confirmAnswer({
            awnsers: selectedAlternativeId,
            question: question
        }))
        dispatch(nextQuestion())
        setSelectedAlternativeId([])
        resetTimer()
        if(remaningQuestions.length === 1){
            onFinishQuizz()
        }
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
                        renderQuizzAlternative[question.type](
                            question.alternatives, 
                            selectedAlternativeId,
                            setSelectedAlternativeId
                        )
                    }
                </div>
                <div>
                    <button onClick={onNextQuestion}>next question</button>
                </div>
            </div>
        </div>
    )
}