import styled, { css } from "styled-components";
import { ICardComponent } from "../../types/cards";
import CardImages from "../../assets/cards";
import { suitColorTemplate } from "../../styles";

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

const Card = (props: ICardComponent) => {
  const {
    attributes,
    posbottom = 0,
    onClick,
    faceDown=false
  } = props;

  const { src, suit } = attributes;
  const color = suitColorTemplate[suit];
  const FrontCard = CardImages[src];
  const BackCard = CardImages["card-back"];

  return (
    <Container>
      <CardContainer>
        <SCard
            color={color}
            posbottom={posbottom}
            className="card__component"
            onClick={onClick}
        >
          {faceDown ? <BackCard /> : <FrontCard />}
        </SCard>
      </CardContainer>
    </Container>
  );
};

export default Card;
