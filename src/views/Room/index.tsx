import { useParams } from 'react-router-dom';
// import Card from '../../components/Card';
import { shuffle } from '../../functions/cards';
import { useRef,useEffect, useState  } from 'react';
import { ICard } from '../../types/cards';
import S from './styles';

const Room = () => {
    const [, setCards] = useState<ICard[]>([])

    const { id } = useParams()
    const roomId = localStorage.getItem("room-id") || ""

    const roomNotFound = id !== roomId

    const isMounted = useRef<boolean>(true)

    useEffect(() => {
        if (isMounted.current && !roomNotFound) {
            const shuffledCards = shuffle()
            setCards(shuffledCards)
        }

        return () => {isMounted.current = false}
    }, [])

    if (roomNotFound) return <div>Room not found</div>

    return (
        <S.Container>
            <S.Board>
                <div className='board__top' />
                <div className='board__front' />
            </S.Board>
            
        </S.Container>
    )
}

export default Room
