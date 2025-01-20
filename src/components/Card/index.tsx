import { ICardComponent } from "../../types/cards"
import CardImages from "../../assets/cards"
import { suitColorTemplate } from "../../styles"

import S from "./style"

const Card = (props: ICardComponent) => {
  const {
    attributes,
    posbottom = 0,
    onClick,
    faceDown=false
  } = props
  
  const { src, suit } = attributes
  const color = suitColorTemplate[suit]
  const FrontCard = CardImages[src]
  const BackCard = CardImages["card-back"]

  return (
    <S.Container>
      <S.CardContainer>
        <S.SCard
            color={color}
            posbottom={posbottom}
            className="card__component"
            onClick={onClick}
        >
          {faceDown ? <BackCard /> : <FrontCard />}
        </S.SCard>
      </S.CardContainer>
    </S.Container>
  )
}

export default Card
