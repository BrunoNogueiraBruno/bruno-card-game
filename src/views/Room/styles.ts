import styled from "styled-components"

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;

    width: 100vw;
    height: 100vh;

`

const Board = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
    perspective: 1000px;

    .board__top {
        background: linear-gradient(0deg, rgb(113 113 113 / 3%) 0%, rgba(65, 65, 65, 0.77) 70%, rgb(109 109 109 / 88%) 101%, rgba(255, 255, 255, 0.41) 100%);
        height: 100%;
        width: 50%;
        position: absolute;
        bottom: -16%;
        transform: rotateX(266deg);
        opacity: 0.7;
        box-shadow: 0px -3px 9px 0px rgb(0 0 0);
    }
    
    .board__front {
        display: flex;
        width: 91.8%;
        height: 5%;
        bottom: 9.3%;
        background: #5b5b5b;
        position: absolute;
        box-shadow: 0px 4px 4px 0px rgb(0 0 0);

        &:after {
            content: "";
            width: 40%;
            height: 386%;
            background: linear-gradient(359deg, #5353530d, #1c1c1c);
            position: relative;
            bottom: -100%;
            left: 30%;
            box-shadow: 0px 4px 4px 0px rgb(161 161 161 / 50%);
        }
    }
`

const S = {Container,Board}
export default S
