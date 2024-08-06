import { useNavigate } from "react-router-dom";
import { Quizz } from "../../../core/quizz/types";
import { useDispatch } from "react-redux";
import { selectQuizz } from "../../../core/quizz/state/actions";
import { AiOutlineRight } from 'react-icons/ai'
import { Container, Subtitle, Title } from "./styles";

interface QuizzItemListProps {
    item: Quizz;
}

export function QuizzItemList({
    item
}: QuizzItemListProps) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <Container 
            onClick={() => {
                dispatch(selectQuizz(item))
                navigate(`/quizz/${item.id}`)
            }} 
            key={item.id}
        >
            <div>
                <Title>{item.title}</Title>
                <Subtitle>{item.description}</Subtitle>
            </div>
            <AiOutlineRight size={15} />
        </Container>
    );
}