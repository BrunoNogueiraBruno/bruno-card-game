import styled, { css } from "styled-components";
import { ICardComponent } from "../../types/cards";
import {  useState } from "react";
import CardImages from "../../assets/cards";
import { suitColorTemplate } from "../../styles";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 25px;
    width: 100vw;
    height: 100vh;
`;

type TCard = {
        color: string;
};

const SCard = styled.div<TCard>`
   ${({ color }) => {
     return css`
       .suit-bg {
         fill: ${color};
       }
     `;
   }}
`;

const FlipCardContainer = styled.div`
     perspective: 1000px;

     .flip-card__inner {
         position: relative;
         width: 200px;
         height: 300px;
         text-align: center;
         transition: transform 0.6s;
         transform-style: preserve-3d;
         box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
         left: -6px;
         top: -12px;
     }

     .flip-card__front,
     .flip-card__back {
         position: absolute;
         width: 100%;
         height: 100%;
         backface-visibility: hidden;
     }

     .flip-card__back {
         transform: rotateY(180deg);
     }
 `;

const Card = (props: ICardComponent) => {
    const [faceDown, setFaceDown] = useState<boolean>(false)

    const {
        attributes
    } = props
    
        const getCard = () => {
            try {
                
            const BackCard = CardImages['card-back'];
    
            const { src, suit } = attributes;
            const color = suitColorTemplate[suit];
            const Component = CardImages[src];
    
            return (
                <FlipCardContainer onClick={() => {setFaceDown((prev) => !prev)}}>
                    <div
                        className="flip-card__inner"
                        style={{
                            transform: faceDown ? 'rotateY(180deg)' : 'rotateY(0deg)', // Controle de rotação
                        }}
                    >
                        <div className="flip-card__front">
                            <SCard color={color}>
                                <Component />
                            </SCard>
                        </div>
    
                        <div className="flip-card__back">
                            <BackCard />
                        </div>
                    </div>
                </FlipCardContainer>
            );
            } catch (error) {
                console.error(error)
            }
        };
    
    return (
        <Container>
            {getCard()}
        </Container>
    )
}

export default Card