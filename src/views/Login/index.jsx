import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import useGlobalStore from '../../hooks/useGlobalStore';

const Container = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    label, button {
        width: 300px;
    }

    label {
        display: flex;
        flex-direction: column;
    }

    input {
        height: 30px;
    }
`

const Login = () => {
    const {sessionOptions,setSessionOptions} = useGlobalStore()
    const navigate = useNavigate()

    const handleCreateRoom = () => {
        try {
            const id = crypto.randomUUID()
            setSessionOptions({...sessionOptions, roomId: id})
            navigate(`room/${id}`)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Container>
            <button onClick={handleCreateRoom} children="Create new room" />
        </Container>
    )
}

export default Login
