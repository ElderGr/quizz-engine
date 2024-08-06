import { useListQuizz } from "../../core/quizz/hook/useQuizzList"
import { QuizzItemList } from "../../components/quizz/quizz-item-list"
import { QuizListContainer } from "./styles"
import { Container } from "../../components/container"

export function Home() {
    const quizzList = useListQuizz()

    return (
        <Container>
            <h1>Home</h1>
            <QuizListContainer>
                {quizzList.map(quizz => (
                    <>
                        <QuizzItemList item={quizz} />
                    </>
                ))}
            </QuizListContainer>           
        </Container>
    )
}