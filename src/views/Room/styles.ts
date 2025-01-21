import styled from "styled-components"

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    overflow: hidden;
    flex-direction: column;

    width: 100vw;
    height: 100vh;

    .board__top__draw-pile, .board__top__discard-pile  {
        background: red;
        position: absolute;
        left: 20%;
        top: 40%;

        .card__component {
            svg {
                position: absolute;
            }
        }
    }

    .board__top__discard-pile {
        left: 80%;
    }

    .hand-card__front, .hand-card__back {        
        padding: 20px 0 0 20px;
        display: flex;
        width: 100%;
        height: 23%;
        overflow-x: auto;
        overflow-y: hidden;
        gap:15px;
    }

.hand-card__back {
    overflow: hidden;
    filter: blur(3px);
    zoom: 50%;
}
`

type TCardContainer = {
    posbottom?: number
}

const CardContainer = styled.div<TCardContainer>`;
`

const S = {Container,CardContainer}
export default S
