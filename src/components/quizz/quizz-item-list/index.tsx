import { useNavigate } from "react-router-dom";
import { Quizz } from "../../../core/quizz/types";
import { useDispatch } from "react-redux";
import { selectQuizz } from "../../../core/quizz/state/actions";
import { AiOutlineRight } from 'react-icons/ai'
import { Container } from "./styles";

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
            <div>{item.title}</div>
            <AiOutlineRight />
        </Container>
    );
}