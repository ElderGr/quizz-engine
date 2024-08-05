import { useDispatch, useSelector } from "react-redux"
import { getQuizzScore } from "../../core/quizz/state/selectors"
import { Link } from "react-router-dom"
import { clearQuestionState } from "../../core/quizz/state/actions"

export function FeedbackPage() {
    const score = useSelector(getQuizzScore)
    const dispatch = useDispatch()

    const onGoHomeClick = () => {
        dispatch(clearQuestionState())
    }

    return (
        <div>
            <h1>Feedback Page</h1>
            <div>{score.correct}</div>

            <Link to={'/'} onClick={onGoHomeClick}>
                Go to home
            </Link>
        </div>
    )
}