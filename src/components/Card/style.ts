import styled, { css } from "styled-components"

const Container = styled.div.attrs({
    className: "card-container"
  })`
  `;
  
  type TCard = {
    color?: string;
    posbottom: number;
  };
  
  const SCard = styled.div<TCard>`
    ${({ color }) => css`
      position: relative;
      display: flex;
      zoom: 50%;
      justify-content: center;
      .suit-bg {
        fill: ${color || "inherit"};
      }
    `}
  `;
  
  const CardContainer = styled.div.attrs({
    className: "card-container__content"
  })`
    position: relative;
    cursor: pointer;
  `;

const S = {Container, SCard, CardContainer}

export default S
