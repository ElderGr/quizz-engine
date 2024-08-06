import { AlternativeProps } from "./types";


export const OneChoiseAlternative = ({ 
    alternative, 
    selectedAlternative, 
    onSelect 
}: AlternativeProps) => {
    return (
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
    )
}