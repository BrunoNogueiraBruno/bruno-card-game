import styled, { css } from "styled-components"

const Container = styled.div.attrs({
    className: "card-container"
  })`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 25px;
    width: 100vw;
    height: 100vh;
  `;
  
  type TCard = {
    color?: string;
    posbottom: number;
  };
  
  const SCard = styled.div<TCard>`
    ${({ color, posbottom }) => css`
      position: relative;
      bottom: ${posbottom}%;
      .suit-bg {
        fill: ${color || "inherit"};
      }
    `}
  `;
  
  const CardContainer = styled.div.attrs({
    className: "card-container__content"
  })`
    width: 150px;
    height: 200px;
    position: relative;
    cursor: pointer;
  `;

const S = {Container, SCard, CardContainer}

export default S
