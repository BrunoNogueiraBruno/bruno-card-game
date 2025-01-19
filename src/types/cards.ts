type Translation = { [key: string]: string };

export interface ICard {
    label?: string;
    name: string;
    translation: Translation;
    suit: string;
    index: number;
    src: string;
  }
  
  export interface IQueryState {
    piles: {
      draw: ICard[];
      discard: ICard[];
    };
    setPiles: (by: Partial<IQueryState["piles"]>) => void; // Allow partial updates to piles
    hands: {
      front: ICard[];
      back: ICard[];
    };
    setHands: (by: Partial<IQueryState["hands"]>) => void; // Allow partial updates to hands
  }

export interface ICardComponent {
    defaultFaceDown?: boolean;
    attributes: ICard;
    faceDown?: boolean;
    preventFlip?: boolean;
    posbottom?: number;
    onClick?: () => void;
}