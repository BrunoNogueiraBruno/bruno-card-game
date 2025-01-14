import { useParams } from 'react-router-dom';
import Card from '../../components/Card';
import { shuffle } from '../../functions/cards';
import { useRef,useEffect, useState  } from 'react';
import { ICard } from '../../types/cards';
import S from './styles';

const Room = () => {
    const [drawPile, setDrawPile] = useState<ICard[]>([])
    const [discardPile, setDiscardPile] = useState<ICard[]>([])

    const [handFront,setHandFront] = useState<ICard[]>([])
    const [handBack,setHandBack] = useState<ICard[]>([])
    
    const { id } = useParams()
    const roomId = localStorage.getItem("room-id") || ""

    const roomNotFound = id !== roomId

    const isMounted = useRef<boolean>(true)

    const getCards = () => {
        let shuffledCards = shuffle()

        const indexToRemove = shuffledCards.findIndex(_card => !_card.suit.includes("action"));
        if (indexToRemove === -1) return

        const firstValidCard = shuffledCards[indexToRemove]
        shuffledCards.splice(indexToRemove, 1)

        const frontCards = shuffledCards.splice(0,7)
        const backCards = shuffledCards.splice(0,7)

        setHandFront(frontCards)
        setHandBack(backCards)
        setDiscardPile([firstValidCard])
        setDrawPile(shuffledCards)
    }

    useEffect(() => {
        if (isMounted.current && !roomNotFound) {
            getCards()
        }

        return () => {isMounted.current = false}
    }, [])

    if (roomNotFound) return <div>Room not found</div>

    return (
        <S.Container>
            <S.Board>

            <S.HandContainer>
                <div className='hand-card__back'>
                {
                        handBack.map((card: ICard, index: number) => {
                            return (
                                <S.CardContainer rightPos={index*-10} key={`hand__card-${index}`}>
                                <Card attributes={card} faceDown />
                                </S.CardContainer>
                            )
                        })
                    }
                </div>
                </S.HandContainer>

                <div className='board__top'>
                    <div className="board__top__draw-pile"> 
                    {
                        drawPile.map((card: ICard,index: number) => {
                            return (
                                <S.CardContainer rightPos={index*-0.25} key={`board__top__card-${index}`} >
                                <Card
                                    attributes={card}
                                    posBottom={index*205.8}
                                    faceDown
                                    
                                    onClick={() => {
                                        setDrawPile(drawPile.filter((_card) => _card !== card))
                                        setHandFront([...handFront, card])
                                    }}
                                />
                                </S.CardContainer>
                            )
                        })
                    }
                    </div>

                    <div className="board__top__discard-pile"> 
                    {
                        discardPile.map((card: ICard,index: number) => {
                            return (
                                <S.CardContainer key={`board__top__card-${index}`}>
                                <Card
                                    attributes={card}
                                    posBottom={index*205.8}
                                />
                                </S.CardContainer>
                            )
                        })
                    }
                    </div>
                </div>
                <div className='board__front' />

                <S.HandContainer>
                <div className='hand-card__front'>
                    {
                        handFront.map((card: ICard, index: number) => {
                            return (
                                <S.CardContainer rightPos={index*-10} key={`hand__card-${index}`}>
                                <Card
                                    attributes={card}
                                    onClick={() => {
                                        setHandFront(handFront.filter((_card) => _card !== card))
                                        setDiscardPile([...discardPile, card])
                                    }}
                                />
                                </S.CardContainer>
                            )
                        })
                    }
                    </div>
                </S.HandContainer>
            </S.Board>
        </S.Container>
    )
}

export default Room
