import { Link } from "react-router-dom"
import { useListQuizz } from "../../core/quizz/hook/useQuizzList"
import { useDispatch } from "react-redux"
import { selectQuizz } from "../../core/quizz/state/actions"

export function Home() {
    const quizzList = useListQuizz()
    const dispatch = useDispatch()

    return (
        <div>
            <h1>Home</h1>
            
            {quizzList.map(quizz => (
                <Link 
                    onClick={() => dispatch(selectQuizz(quizz))} 
                    to={`/quizz/${quizz.id}`} 
                    key={quizz.id}
                >
                    <div>{quizz.title}</div>
                </Link>
            ))}
        </div>
    )
}