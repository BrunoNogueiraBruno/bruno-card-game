import { useParams } from 'react-router-dom';
import Card from '../../components/Card';
import { shuffle } from '../../functions/cards';
import { useRef,useEffect  } from 'react';
import { ICard } from '../../types/cards';
import S from './styles';
import useGlobalStore from '../../hooks/useGlobalStore';

const Room = () => {
    const {drawPile,discardPile,handFront,handBack, setValue} = useGlobalStore()
    
    const { id } = useParams()
    const roomId = localStorage.getItem("room-id") || ""

    const roomNotFound = id !== roomId

    const isMounted = useRef<boolean>(true)

    const getCards = () => {
        const shuffledCards = shuffle()

        const indexToRemove = shuffledCards.findIndex(_card => !_card.suit.includes("action"));
        if (indexToRemove === -1) return

        const firstValidCard = shuffledCards[indexToRemove]
        shuffledCards.splice(indexToRemove, 1)

        const handFront = shuffledCards.splice(0,7)
        const handBack = shuffledCards.splice(0,7)

        setValue(handFront,"handFront")
        setValue(handBack,"handBack")
        setValue([firstValidCard],"discardPile")
        setValue(shuffledCards,"drawPile")
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
                                <S.CardContainer posright={index*-10} key={`hand__card-${index}`}>
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
                                <S.CardContainer posright={index*-0.25} key={`board__top__card-${index}`} >
                                <Card
                                    attributes={card}
                                    posbottom={index*205.8}
                                    faceDown
                                    
                                    onClick={() => {
                                        setValue(drawPile.filter((_card) => _card !== card),"drawPile")
                                        setValue([...handFront, card],"handFront")
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
                                    posbottom={index*205.8}
                                    onClick={() => {
                                        setValue(discardPile.filter((_card) => _card !== card),"discardPile")
                                        setValue([...handFront, card],"handFront")
                                    }}
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
                                <S.CardContainer posright={index*-10} key={`hand__card-${index}`}>
                                <Card
                                    attributes={card}
                                    onClick={() => {
                                        setValue(handFront.filter((_card) => _card !== card),"handFront")
                                        setValue([...discardPile, card],"discardPile")
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
