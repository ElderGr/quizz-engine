import { useListQuizz } from "../../core/quizz/hook/useQuizzList"
import { QuizzItemList } from "../../components/quizz/quizz-item-list"

export function Home() {
    const quizzList = useListQuizz()

    return (
        <div>
            <h1>Home</h1>
            
            <div>
                {quizzList.map(quizz => (
                    <QuizzItemList item={quizz} />
                ))}
            </div>           
        </div>
    )
}