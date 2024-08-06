import { useDispatch, useSelector } from "react-redux"
import { currentQuizzQuestionSelector, isLastQuestionSelector, selectedQuizzSelector } from "../../core/quizz/state/selectors"
import { useState } from "react"
import { QuizzQuestionAlternative, QuizzQuestionTypeEnum } from "../../core/quizz/types"
import { confirmAnswer } from "../../core/quizz/state/actions"
import { useNavigate } from "react-router"
import { Container } from "../../components/container"
import { Button } from "../../components/button"
import { OneChoiseAlternative } from "../../components/quizz/one-choice-alternative"

const renderQuizzAlternative = {
    [QuizzQuestionTypeEnum.ONE_CHOISE]: (
        alternatives: QuizzQuestionAlternative[],
        selectedAlternative: string[],
        onSelect: React.Dispatch<React.SetStateAction<string[]>>
    ) => (
        <div>
            {alternatives.map((alternative) => (
               <OneChoiseAlternative  
                   alternative={alternative}
                   selectedAlternative={selectedAlternative}
                   onSelect={onSelect}
                   key={alternative.id}
               />
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
    const isLastQuestion = useSelector(isLastQuestionSelector)
    const dispatch = useDispatch()
    const [selectedAlternativeId, setSelectedAlternativeId] = useState<string[]>([]);
    const navigate = useNavigate()


    const onNextQuestion = () => {
        if(!question) return
        dispatch(confirmAnswer({
            awnsers: selectedAlternativeId,
            question: question
        }))
        setSelectedAlternativeId([])
        if(isLastQuestion){
            onFinishQuizz()
        }
    }

    const onFinishQuizz = () => {
        navigate(`/quizz/${selectedQuizz.id}/feedback`)
    }

    return (
        <Container>
            <h1>{selectedQuizz.title}</h1>
            <h2>{selectedQuizz.description}</h2>
            <div>
                <div>{question?.title}</div>
                <img 
                    src={question?.imageSource}
                    width={400}
                    height={400}
                />
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
                    <Button onClick={onNextQuestion}>
                        Next question
                    </Button>
                </div>
            </div>
        </Container>
    )
}