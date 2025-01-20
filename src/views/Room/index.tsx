import Card from '../../components/Card';
import { shuffle } from '../../functions/cards';
import { useRef,useEffect, useState, SetStateAction} from 'react';
import { ICard } from '../../types/cards';
import S from './styles';
import { connect, publishMessage, subscribeToChannel } from '../../functions/ably'

interface IState {
    drawPile: ICard[],
    discardPile: ICard[],
    handHost: ICard[],
    handClient: ICard[],
}

const INITIAL_STATE = {drawPile: [],discardPile: [],handHost: [],handClient: []}

const Room = (props: {host: boolean}) => {
    const {host} = props
    const userId = localStorage.getItem("user-id") || ""
    
    const [state,setState]=useState<IState>(INITIAL_STATE)
    const {drawPile,discardPile,handHost,handClient} = state

    const isMounted = useRef<boolean>(true)

    useEffect(() => console.log(state),[state])

    const handleSetState = (updateState: SetStateAction<IState>) => {
        setState(updateState)
        publishMessage(userId, "state", updateState)
    }

    const getCards = async () => {
        const shuffledCards = shuffle()

        const indexToRemove = shuffledCards.findIndex(_card => !_card.suit.includes("action"));
        if (indexToRemove === -1) return

        const firstValidCard = shuffledCards[indexToRemove]
        shuffledCards.splice(indexToRemove, 1)

        const handHost = shuffledCards.splice(0,7)
        const handClient = shuffledCards.splice(0,7)
        const discardPile = [firstValidCard]
        const drawPile = shuffledCards

        handleSetState({handHost,handClient,discardPile,drawPile})
    }

    const handleConnect = async () => {
        try {
            const userId = localStorage.getItem("user-id") || crypto.randomUUID()
            localStorage.setItem("user-id", userId)

            await connect()
            await subscribeToChannel("state",({data}:any) => {
                setState(data)
            })

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (isMounted.current) {
            handleConnect()
            if (host) getCards()
        }

        return () => {
            isMounted.current = false
        }
    }, [])

    const backDisplay = host ? handClient : handHost
    const frontDisplay = host ? handHost : handClient

    const handType = host ? "handHost" : "handClient"

    return (
        <S.Container>
            <S.Board>

            <S.HandContainer>
                <div className='hand-card__back'>
                {
                        backDisplay.map((card: ICard, index: number) => {
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
                                    posbottom={index*180}
                                    faceDown
                                    
                                    onClick={() => {
                                        const update = {
                                            ...state,
                                            drawPile:drawPile.filter((_card) => _card !== card),
                                            [handType]: [...frontDisplay, card]
                                        }
                                        handleSetState(update)
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
                                    posbottom={index*180}
                                    onClick={() => {
                                        const update = {
                                            ...state,
                                            discardPile:discardPile.filter((_card) => _card !== card),
                                            [handType]: [...frontDisplay, card]
                                        }
                                        handleSetState(update)
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
                        frontDisplay.map((card: ICard, index: number) => {
                            return (
                                <S.CardContainer posright={index*10} key={`hand__card-${index}`}>
                                <Card
                                    attributes={card}
                                    onClick={() => {
                                        const update = {
                                            ...state,
                                            discardPile: [...discardPile, card],
                                            [handType]:frontDisplay.filter((_card) => _card !== card),
                                        }
                                        handleSetState(update)
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
