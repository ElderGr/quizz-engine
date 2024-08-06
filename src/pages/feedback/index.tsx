import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { clearQuestionState } from "../../core/quizz/state/actions"

export function FeedbackPage() {
    const dispatch = useDispatch()

    const onGoHomeClick = () => {
        dispatch(clearQuestionState())
    }

    return (
        <div>
            <h1>Feedback Page</h1>
            <Link to={'/'} onClick={onGoHomeClick}>
                Go to home
            </Link>
        </div>
    )
}