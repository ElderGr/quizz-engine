import { ButtonHTMLAttributes } from "react";
import { ButtonContainer } from "./styles";

export function Button({ children, ...props }: React.PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
    return (
        <ButtonContainer 
            {...props}
            color="primary"
        >
            {children}
        </ButtonContainer>
    )
}