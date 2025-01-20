import styled, { css } from "styled-components"

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;

    width: 100vw;
    height: 100vh;

    overflow-y: auto;
    overflow-x: hidden;

`

const Board = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    perspective: 1000px;
    

    .board__top {
        background: linear-gradient(0deg, rgb(37 37 37) 0%, rgb(65 65 65) 70%, rgb(109 109 109 / 88%) 101%, rgba(255, 255, 255, 0.41) 100%);
        position: absolute;
        bottom: -16%;
        box-shadow: 0px 4px 9px 0px rgb(0 0 0);
        z-index: 9;
        opacity: .9;

        height: 124%;
        width: 70%;
        transform: rotateX(248deg);


        .board__top__draw-pile {
            position: absolute;
            z-index: 2;

            .card__component {
            transform: scale(.5,-0.5);
            right: 260%;

            svg {
                border: 1px dashed gray;
            }
            }

        }

        .board__top__discard-pile {
            position: absolute;
            top: 0;
            

            .card__component {
            transform: scale(.5, -0.6);
            right: 100%;

            svg {
                border: 1px dashed gray;
                transform: translateY(44%);
            }
            }
            z-index: 2;
            left: 25%;
        }
    }
    
    .board__front {
        display: flex;
        bottom: 11%;
        background: #5b5b5b;
        position: absolute;
        box-shadow: 0px 4px 4px 0px rgb(0 0 0);
        z-index: 8;

        height: 5%;
        width: 92%;

        &:after {
            content: "";
            width: 60%;
            height: 900%;
            background: linear-gradient(359deg, #5353530d, #1c1c1c);
            position: relative;
            bottom: -100%;
            left: 20%;
            box-shadow: 0px 4px 4px 0px rgb(161 161 161 / 50%);
        }

        .board__top__card {
            background: red;
        }
    }
`

type TCardContainer = {
    posright?: number
}

const CardContainer = styled.div<TCardContainer>`
    ${({posright=null}) => {
        if (!posright) return ""

        return css`
            svg {
                transform: translateX(${posright}px);
            }
        `
    }}
`

const HandContainer = styled.div`

    .hand-card__back {
        display: flex;
        z-index: 1;
        position: fixed;
        height: 50%;
        opacity: .6;
        gap: 1%;
        filter: blur(2px);

        justify-content: center;
        width: 100%;

        .card-container {
            width: fit-content !important;
        }

        .card__component {
            zoom: 25%;
            transform: translateY(-50%);
        }

        .card-container__content {
            width: fit-content;
        }
    }

    .hand-card__front {
        display: flex;
        z-index: 100;
        width: 100vw;
        position: relative;
        bottom: -70%;
        height: 50%;

        overflow-x: auto;
        overflow-y: hidden;

        .card-container {
            width: 130% !important;
        }

        .card__component {
            zoom: 50%;
            transform: translateY(-50%);
        }
    }
`

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const S = {Container,Board,HandContainer,ButtonsContainer,CardContainer}
export default S
