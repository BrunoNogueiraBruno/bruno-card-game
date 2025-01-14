import styled from "styled-components"
import { IButton } from "../../types/button"

const SButton = styled.button`
    background: none;
    border: 1px solid var(--white);
`

const Button = (props: IButton) => {
    const { children } = props

    return (
        <SButton
            children={children}
        />
    )
}

export default Button
